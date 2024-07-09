import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl

//   const response = NextResponse.next()

//   // if (pathname.startsWith('/providers')) {
//   //   const [, , id] = pathname.split('/')
//   //   response.cookies.set('provider', id)
//   // } 
//  if (pathname.startsWith('/appointments')){
//     const [, , status] = pathname.split('/')
//     response.cookies.set('status', status)
//   }
//    else {
//     // response.cookies.delete('provider')
//     response.cookies.delete('status')
//   }
//   return response
  
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
