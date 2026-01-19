import { Inter, Lusitana, Public_Sans } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});

// Setup Public Sans as a variable font
export const publicSans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  // Since it's a variable font, we don't need to specify weights 
  // unless we want to limit them, but it's best to let it be flexible.
  variable: '--font-public-sans', 
});