"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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

export default function JobNew() {
  const router = useRouter();

  const [category, setCategory] = useState("");
  const [salary, setSalary] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    // カテゴリチェック
    if (!category) {
      setError("求人カテゴリを選択してください");
      return;
    }

    // 年収チェック
    if (!salary) {
      setError("年収を入力してください");
      return;
    }

    const salaryNumber = Number(salary);

    if (Number.isNaN(salaryNumber)) {
      setError("年収には数値を入力してください");
      return;
    }

    if (salaryNumber <= 0) {
      setError("年収は1以上の数値を入力してください");
      return;
    }

    // 求人タイトルチェック
    if (!title.trim()) {
      setError("求人タイトルを入力してください");
      return;
    }

    try {
      const { error } = await supabase
        .from("jobs")
        .insert({
          title: title.trim(),
          category: category,
          salary: salaryNumber,
        });

      if (error) {
        throw error;
      }

      // 投稿成功後、求人一覧へ移動
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      setError("求人の投稿に失敗しました");
    }
  };

  return (
    <main className="w-full">
      <div className="mx-auto w-[50vw] px-4 py-8">

        {/* ページタイトル */}
        <h2 className="mb-10 text-[18px] font-bold text-gray-800">
          求人投稿
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* 求人カテゴリ */}
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm text-gray-700"
            >
              求人カテゴリ選択
            </label>

            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full max-w-[230px] border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none"
            >
              <option value="">
                カテゴリを選択 ▼
              </option>

              {categories.map((categoryName) => (
                <option
                  key={categoryName}
                  value={categoryName}
                >
                  {categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* 年収 */}
          <div>
            <label
              htmlFor="salary"
              className="mb-2 block text-sm text-gray-700"
            >
              年収（万円）
            </label>

            <input
              id="salary"
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full max-w-[230px] border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* 求人タイトル */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm text-gray-700"
            >
              求人タイトル
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* エラーメッセージ */}
          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          {/* 投稿ボタン */}
          <button
            type="submit"
            className="w-full max-w-[230px] bg-sky-500 px-6 py-3 font-bold text-white transition hover:bg-sky-600"
          >
            投稿
          </button>

        </form>
      </div>
    </main>
  );
}