'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ComingSoonDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ComingSoonDialog({ open, onOpenChange }: ComingSoonDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>빠르게 준비 중입니다</DialogTitle>
          <DialogDescription>
            조금만 기다려주세요. 곧 더 나은 서비스로 찾아뵙겠습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Button
            type="submit"
            size="sm"
            className="px-3 flex-1"
            onClick={() => onOpenChange(false)}
          >
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 