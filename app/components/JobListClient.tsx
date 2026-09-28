"use client";

import { useEffect, useState } from "react";


type Job = {
  id: number;
  title: string;
  category: string;
  salary: number;
};

const categories = [
  "事務",
  "エンジニア",
  "営業",
  "デザイン",
  "マーケティング",
  "財務・経理",
  "人事",
  "カスタマーサポート",
  "製造",
  "医療・介護",
];

export default function JobList({
  initialJobs,
}: {
  initialJobs: Job[];
}) {
  const [jobs] = useState<Job[]>(initialJobs);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    []
  );
  const [minimumSalary, setMinimumSalary] = useState(0);



  const handleCategoryChange = (category: string) => {
    setCurrentPage(1);

    setSelectedCategories((current) => {
      if (current.includes(category)) {
        return current.filter((item) => item !== category);
      }

      return [...current, category];
    });
  };

  const filteredJobs = jobs.filter((job) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);

    const salaryMatch = job.salary >= minimumSalary;

    return categoryMatch && salaryMatch;
  });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * jobsPerPage;

  const currentJobs = filteredJobs.slice(
    startIndex,
    startIndex + jobsPerPage
  );

 

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-[50vw] px-0 pt-0">
        <div className="grid grid-cols-[165px_1fr]">

          {/* サイドバー */}
          <aside className="min-h-[750px] bg-[#edf2f4] px-3 py-4">

            <div>
              <h2 className="mb-4 text-[14px] font-bold text-[#1f2933]">
                求人カテゴリ
              </h2>

              <div className="space-y-[7px]">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex cursor-pointer items-center gap-1.5 text-[11px] text-[#374151]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() =>
                        handleCategoryChange(category)
                      }
                      className="h-[13px] w-[13px] cursor-pointer accent-sky-500"
                    />

                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 年収 */}
            <div className="mt-5">
              <h2 className="mb-2 text-[14px] font-bold text-[#1f2933]">
                年収
              </h2>

              <select
                value={minimumSalary}
                onChange={(e) => {
                  setCurrentPage(1);
                  setMinimumSalary(Number(e.target.value));
                }}
                className="w-full border border-[#d1d5db] bg-white px-2 py-2 text-[10px] text-[#374151] outline-none"
              >
                <option value={0}>指定なし</option>
                <option value={300}>300万円以上</option>
                <option value={400}>400万円以上</option>
                <option value={500}>500万円以上</option>
                <option value={600}>600万円以上</option>
                <option value={700}>700万円以上</option>
                <option value={800}>800万円以上</option>
              </select>
            </div>
          </aside>

          {/* 求人一覧 */}
          <section className="bg-white px-3 py-4">

            <div className="mb-4">
              <h1 className="text-[15px] font-bold text-[#1f2933]">
                求人一覧
              </h1>

              <p className="mt-1 text-[10px] text-[#555]">
                該当件数：{filteredJobs.length}件
              </p>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="border border-[#d9d9d9] bg-white px-4 py-8 text-center">
                <p className="text-[11px] text-gray-500">
                  条件に一致する求人はありません。
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {currentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="min-h-[92px] border border-[#d8d8d8] bg-white px-3 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                  >
                    <h3 className="text-[12px] font-bold leading-5 text-[#222]">
                      {job.title}
                    </h3>

                    <p className="mt-1 text-[10px] text-[#444]">
                      カテゴリ：{job.category}
                    </p>

                    <p className="mt-1 text-[10px] text-[#444]">
                      年収：{job.salary}万円
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* ページネーション */}
            {totalPages > 1 && (
              <div className="mt-5 flex items-center justify-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) => page - 1)
                  }
                  disabled={currentPage === 1}
                  className="px-1 text-[11px] text-[#333] disabled:opacity-40"
                >
                  ◀
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className="px-1 text-[11px] text-[#333]"
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) => page + 1)
                  }
                  disabled={currentPage === totalPages}
                  className="px-1 text-[11px] text-[#333] disabled:opacity-40"
                >
                  ▶
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}