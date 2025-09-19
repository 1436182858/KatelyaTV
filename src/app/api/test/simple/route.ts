import { NextRequest, NextResponse } from 'next/server';

// 配置Edge Runtime，Cloudflare Pages必需
export const runtime = 'edge';

/**
 * 测试API路由的GET方法
 * 用于验证服务器是否正常工作
 */
export async function GET(request: NextRequest) {
  try {
    // 可以添加一些简单的测试逻辑
    const queryParams = request.nextUrl.searchParams;
    const testParam = queryParams.get('test') || '默认值';
    
    return NextResponse.json({
      message: '测试路由成功响应',
      timestamp: new Date().toISOString(),
      receivedParam: testParam,
      runtime: 'edge' // 验证运行时环境
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('测试路由错误:', error);
    return NextResponse.json({
      error: '测试路由处理失败',
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined
    }, {
      status: 500
    });
  }
}

// 如果你需要支持其他HTTP方法，可以在这里添加
// export async function POST(request: NextRequest) {
//   // 处理POST请求的逻辑
// }
    
