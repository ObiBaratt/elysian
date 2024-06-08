import Link from "next/link";
import { FileClock, FileText, PieChart } from "lucide-react";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">Elysium</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
        <div className="flex h-64 w-full max-w-96 flex-col justify-between bg-neutral-100 p-4 text-black">
          <div className="flex justify-between">
            <FileText className="text-primary-40" size={64} />
          </div>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
            eget lorem quis pharetra.
          </p>
        </div>

        <div className="flex h-64 w-full max-w-96 flex-col justify-between bg-neutral-100 p-4 text-black">
          <div className="flex justify-between">
            <PieChart className="text-primary-40" size={64} />
          </div>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
            eget lorem quis pharetra.
          </p>
        </div>

        <div className="flex h-64 w-full max-w-96 flex-col justify-between bg-neutral-100 p-4 text-black">
          <div className="flex justify-between">
            <FileClock className="text-primary-40" size={64} />
          </div>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
            eget lorem quis pharetra.
          </p>
        </div>
      </div>
    </main>
  );
}
