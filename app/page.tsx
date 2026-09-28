import { supabase } from "@/lib/supabase";
import JobListClient from "./components/JobListClient";

type Job = {
  id: number;
  title: string;
  category: string;
  salary: number;
};

export default async function Home() {
  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto w-[50vw] px-4 py-8">
          <h1 className="text-[15px] font-bold text-[#1f2933]">
            求人情報の取得に失敗しました。
          </h1>

          <p className="mt-2 text-[10px] text-red-500">
            {error.message}
          </p>
        </div>
      </main>
    );
  }

  return <JobListClient initialJobs={(jobs ?? []) as Job[]} />;
}