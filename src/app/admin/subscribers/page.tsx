'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Subscriber {
  _id: string
  email: string
  subscribedAt: string
  source: string
  status: string
}

interface Pagination {
  total: number
  page: number
  limit: number
  pages: number
}

interface Filters {
  sources: string[]
  statuses: string[]
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0
  })
  const [filters, setFilters] = useState<Filters>({
    sources: [],
    statuses: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // 검색 및 필터링 상태
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedSource, setSelectedSource] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  
  // 삭제 상태
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false)
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null)

  useEffect(() => {
    fetchSubscribers(pagination.page, pagination.limit)
  }, [pagination.page, pagination.limit])

  const fetchSubscribers = async (page: number, limit: number) => {
    try {
      setLoading(true)
      setError(null)
      
      // 검색 매개변수 구성
      const params = new URLSearchParams()
      params.append('page', page.toString())
      params.append('limit', limit.toString())
      
      if (searchTerm) params.append('search', searchTerm)
      if (selectedStatus) params.append('status', selectedStatus)
      if (selectedSource) params.append('source', selectedSource)
      if (startDate) params.append('startDate', startDate)
      if (endDate) params.append('endDate', endDate)
      
      const response = await fetch(`/api/subscribers?${params.toString()}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || '구독자 목록을 불러오는 데 실패했습니다.')
      }
      
      const data = await response.json()
      if (data.success) {
        setSubscribers(data.data.subscribers)
        setPagination(data.data.pagination)
        
        // 필터 옵션 설정 (첫 로드시에만)
        if (data.data.filters && filters.sources.length === 0) {
          setFilters(data.data.filters)
        }
      } else {
        throw new Error(data.message || '구독자 목록을 불러오는 데 실패했습니다.')
      }
    } catch (err) {
      console.error('구독자 목록 조회 오류:', err)
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchSubscribers(1, pagination.limit) // 검색 시 첫 페이지로 초기화
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedStatus('')
    setSelectedSource('')
    setStartDate('')
    setEndDate('')
    fetchSubscribers(1, pagination.limit)
  }

  const handleDeleteSubscriber = async (id: string) => {
    // 첫 클릭 시 확인 요청
    if (deletingId !== id || !deleteConfirmation) {
      setDeletingId(id)
      setDeleteConfirmation(true)
      setDeleteMessage(null)
      return
    }
    
    try {
      setLoading(true)
      
      const response = await fetch(`/api/subscribers?id=${id}`, {
        method: 'DELETE'
      })
      
      const data = await response.json()
      
      if (data.success) {
        // 삭제 성공 시 목록 갱신
        setDeleteMessage('구독자가 성공적으로 삭제되었습니다.')
        fetchSubscribers(pagination.page, pagination.limit)
      } else {
        setDeleteMessage(`오류: ${data.message}`)
      }
    } catch (err) {
      console.error('구독자 삭제 오류:', err)
      setDeleteMessage('구독자 삭제 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
      setDeleteConfirmation(false)
      setDeletingId(null)
      
      // 3초 후 메시지 삭제
      setTimeout(() => {
        setDeleteMessage(null)
      }, 3000)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date)
  }

  const renderPagination = () => {
    const pages = []
    for (let i = 1; i <= pagination.pages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => fetchSubscribers(i, pagination.limit)}
          className={`px-3 py-1 rounded ${
            pagination.page === i
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {i}
        </button>
      )
    }
    return pages
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">뉴스레터 구독자 목록</h1>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          홈으로 돌아가기
        </Link>
      </div>

      {/* 검색 및 필터링 */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                이메일 검색
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="이메일 검색..."
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                상태
              </label>
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">모든 상태</option>
                {filters.statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === 'active' ? '활성' : status}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
                출처
              </label>
              <select
                id="source"
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">모든 출처</option>
                {filters.sources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                시작 날짜
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              필터 초기화
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              검색
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
          <p>{error}</p>
        </div>
      )}
      
      {deleteMessage && (
        <div className={`mb-6 p-4 rounded ${deleteMessage.includes('오류') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          <p>{deleteMessage}</p>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">구독자 정보를 불러오는 중...</p>
        </div>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <div className="p-4 bg-gray-50 border-b">
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">
                  총 <span className="text-blue-600">{pagination.total}</span>명의 구독자
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                    <th className="py-3 px-4 text-left">ID</th>
                    <th className="py-3 px-4 text-left">이메일</th>
                    <th className="py-3 px-4 text-left">구독 일시</th>
                    <th className="py-3 px-4 text-left">출처</th>
                    <th className="py-3 px-4 text-left">상태</th>
                    <th className="py-3 px-4 text-left">작업</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {subscribers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-4 px-4 text-center">
                        구독자가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    subscribers.map((subscriber) => (
                      <tr key={subscriber._id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{subscriber._id.toString().substring(0, 8)}...</td>
                        <td className="py-3 px-4">{subscriber.email}</td>
                        <td className="py-3 px-4">{formatDate(subscriber.subscribedAt)}</td>
                        <td className="py-3 px-4">{subscriber.source}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            subscriber.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {subscriber.status === 'active' ? '활성' : subscriber.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button 
                            onClick={() => handleDeleteSubscriber(subscriber._id)}
                            className={`px-2 py-1 rounded text-xs ${
                              deletingId === subscriber._id && deleteConfirmation
                                ? 'bg-red-600 text-white' 
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            {deletingId === subscriber._id && deleteConfirmation ? '삭제 확인' : '삭제'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {pagination.pages > 1 && (
            <div className="flex justify-center gap-2 my-4">
              <button
                onClick={() => fetchSubscribers(1, pagination.limit)}
                disabled={pagination.page === 1}
                className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                &lt;&lt;
              </button>
              <button
                onClick={() => fetchSubscribers(pagination.page - 1, pagination.limit)}
                disabled={pagination.page === 1}
                className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                &lt;
              </button>
              
              {renderPagination()}
              
              <button
                onClick={() => fetchSubscribers(pagination.page + 1, pagination.limit)}
                disabled={pagination.page === pagination.pages}
                className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                &gt;
              </button>
              <button
                onClick={() => fetchSubscribers(pagination.pages, pagination.limit)}
                disabled={pagination.page === pagination.pages}
                className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                &gt;&gt;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
} 