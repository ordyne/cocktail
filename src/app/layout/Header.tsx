import Link from "next/link";
import Image from "next/image";

export default function Header() {
	return (
		<>
			<header>
				<div className="flex justify-between items-center w-full h-16">
					<div>
						<Link href="/" >
							<Image src="/images/logo.png" alt="로고" width={100} height={100} className="w-40 h-20" />
						</Link>
					</div>
					<div className="w-md">
						<input
							type="text"
							value=""
							placeholder="Search"
							className="bg-white text-black text-base w-full h-10 px-4 rounded-lg border border-[#ee6f6f] focus:outline-none focus:border-[#ee6f6f] focus:ring-[#ee6f6f] focus:ring-1 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
						/>
					</div>
					<div className="flex items-baseline gap-4">
						<Link href="/" className="text-lg">Home</Link>
						<Link href="/today" className="text-lg">Today</Link>
            <Link href="/cocktails/recipes" className="text-lg">Recipes</Link>
            <div className="w-20 p-[2px] bg-gradient-to-r from-[#ffbb76] to-[#eb5757] rounded-2xl text-center">
              <Link href="/login" className="w-18 inline-block text-md rounded-2xl bg-black p-1">로그인</Link>
              </div>
					</div>
				</div>
			</header>

			{/* <header className="flex items-center justify-between w-full h-16 px-8 bg-foreground text-background">
        <h1 className="text-xl font-bold">Cocktail</h1>
        <nav className="flex gap-4"></nav>
      </header> */}
		</>
	);
}
