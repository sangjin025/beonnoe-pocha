import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata={title:'번뇌포차 — 오늘의 번뇌, 여기 두고 가요',description:'불교의 관점으로 마음을 돌아보는 번뇌포차. 가상 고민으로 상담부터 번뇌 영수증까지 체험하는 MVP입니다.',icons:{icon:'/favicon.svg'}};
export const viewport:Viewport={width:'device-width',initialScale:1,viewportFit:'cover',interactiveWidget:'resizes-content',themeColor:'#f7f6f2'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body>{children}</body></html>}
