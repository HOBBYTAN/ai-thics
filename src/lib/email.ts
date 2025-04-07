import nodemailer from 'nodemailer';

// 이메일 설정
let transporter: nodemailer.Transporter;

// 항상 SMTP를 사용하거나 테스트 계정으로 전환
export async function initEmailTransporter() {
  if (!transporter) {
    // Gmail의 SMTP 서버를 사용하여 실제 이메일 발송
    // pablo@hobbytan.com으로 보내기 위해 항상 실제 SMTP를 사용
    transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'noreply.aithics@gmail.com',
        pass: 'xihwtlvkwuzjmrda', // 앱 비밀번호 사용 (Gmail 2단계 인증 필요)
      },
    });
  }
  return transporter;
}

// 구독 알림 이메일 발송
export async function sendSubscriptionNotification(subscriberEmail: string) {
  try {
    const transport = await initEmailTransporter();
    const adminEmail = process.env.ADMIN_EMAIL || 'pablo@hobbytan.com';
    
    // 관리자에게 새 구독자 알림 이메일 발송
    const info = await transport.sendMail({
      from: `"AI-thics 알림" <noreply.aithics@gmail.com>`,
      to: adminEmail,
      subject: `[AI-thics] 새로운 뉴스레터 구독자: ${subscriberEmail}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #3b82f6;">새로운 뉴스레터 구독자 알림</h2>
          <p style="font-size: 16px; line-height: 1.5;">
            안녕하세요, 관리자님.<br>
            새로운 뉴스레터 구독자가 등록되었습니다.
          </p>
          <div style="margin: 20px 0; padding: 15px; background-color: #f3f4f6; border-radius: 8px;">
            <p style="margin: 0; font-size: 15px;"><strong>구독자 이메일:</strong> ${subscriberEmail}</p>
            <p style="margin: 8px 0 0; font-size: 15px;"><strong>구독 일시:</strong> ${new Date().toLocaleString('ko-KR')}</p>
          </div>
          <p style="font-size: 16px; line-height: 1.5;">
            구독자 관리 페이지에서 모든 구독자 목록을 확인할 수 있습니다.
          </p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
            <p>이 메일은 자동으로 발송되었습니다. 회신하지 마세요.</p>
          </div>
        </div>
      `,
    });
    
    console.log('구독 알림 이메일 발송 완료:', info.messageId);
    return info;
  } catch (error) {
    console.error('이메일 발송 중 오류 발생:', error);
    throw error;
  }
}

// 구독자 환영 이메일 발송
export async function sendWelcomeEmail(subscriberEmail: string) {
  try {
    const transport = await initEmailTransporter();
    
    // 구독자에게 환영 이메일 발송
    const info = await transport.sendMail({
      from: `"AI-thics 뉴스레터" <noreply.aithics@gmail.com>`,
      to: subscriberEmail,
      subject: 'AI-thics 뉴스레터 구독을 환영합니다!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #3b82f6;">AI-thics 뉴스레터 구독을 환영합니다!</h2>
          <p style="font-size: 16px; line-height: 1.5;">
            안녕하세요,<br>
            AI-thics 뉴스레터 구독을 성공적으로 완료했습니다.
          </p>
          <p style="font-size: 16px; line-height: 1.5;">
            AI 윤리, 보안, 설명가능성과 관련된 최신 동향과 인사이트를 정기적으로 받아보실 수 있습니다.
          </p>
          <div style="margin: 25px 0;">
            <a href="https://ai-thics.com" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">홈페이지 방문하기</a>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
            <p>더 이상 뉴스레터를 받고 싶지 않으시면 이 이메일에 회신하시거나 <a href="https://ai-thics.com/unsubscribe" style="color: #3b82f6;">여기</a>를 클릭하여 구독을 취소하실 수 있습니다.</p>
          </div>
        </div>
      `,
    });
    
    console.log('환영 이메일 발송 완료:', info.messageId);
    return info;
  } catch (error) {
    console.error('이메일 발송 중 오류 발생:', error);
    throw error;
  }
} 