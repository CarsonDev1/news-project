import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import NextTopLoader from 'nextjs-toploader';
import Provider from '@/utils/Provider';
import '@/app/globals.css';

const poppins = Poppins({
	weight: ['400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${poppins.className}`}>
				<Provider>
					<Header />
					<NextTopLoader color='#df1e1e' showSpinner={false} />
					{children}
					<Footer />
				</Provider>
			</body>
		</html>
	);
}
