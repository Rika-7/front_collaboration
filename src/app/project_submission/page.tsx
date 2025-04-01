"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Header } from "@/components/common/Header";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

export default function Component() {
  const [selectedOption, setSelectedOption] = useState("研究分野のヒアリング");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const industries = [
    { value: "自動車", label: "自動車" },
    { value: "精密機械", label: "精密機械" },
    { value: "機械", label: "機械" },
    { value: "化学", label: "化学" },
    { value: "食品", label: "食品" },
    { value: "建設", label: "建設" },
    { value: "サービス", label: "サービス" },
    { value: "その他", label: "その他" },
  ];

  const researchFields = [
    { value: "情報工学", label: "情報工学" },
    { value: "電気工学", label: "電気工学" },
    { value: "機械工学", label: "機械工学" },
    { value: "材料工学", label: "材料工学" },
    { value: "化学", label: "化学" },
    { value: "生物学", label: "生物学" },
    { value: "医学", label: "医学" },
    { value: "農学", label: "農学" },
    { value: "その他", label: "その他" },
  ];

  const researcherLevels = [
    { value: "教授", label: "教授" },
    { value: "准教授", label: "准教授" },
    { value: "講師", label: "講師" },
    { value: "助教", label: "助教" },
    { value: "ポスドク", label: "ポスドク" },
    { value: "博士課程", label: "博士課程" },
    { value: "修士課程", label: "修士課程" },
    { value: "学部生", label: "学部生" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Add the Header component here with the current page */}
      <Header currentPage="案件検索" />

      <div className="flex justify-center flex-grow">
        <div className="w-full max-w-3xl px-4 py-8">
          <h1 className="text-2xl font-normal mb-6">新規案件を登録する</h1>

          <div className="bg-gray-100 p-6 rounded">
            <div className="mb-6">
              <div className="flex items-start mb-2">
                <label className="text-sm">依頼のカテゴリ</label>
                <span className="text-red-500 ml-1">*</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="option1"
                    name="category"
                    className="w-4 h-4 text-blue-600"
                    checked={selectedOption === "研究分野のヒアリング"}
                    onChange={() => setSelectedOption("研究分野のヒアリング")}
                  />
                  <label htmlFor="option1" className="ml-2 text-sm">
                    研究分野のヒアリング
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="option2"
                    name="category"
                    className="w-4 h-4 text-blue-600"
                    checked={
                      selectedOption ===
                      "アドバイス・実務成果の相談（要打ち合わせ）"
                    }
                    onChange={() =>
                      setSelectedOption(
                        "アドバイス・実務成果の相談（要打ち合わせ）"
                      )
                    }
                  />
                  <label htmlFor="option2" className="ml-2 text-sm">
                    アドバイス・実務成果の相談（要打ち合わせ）
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="option3"
                    name="category"
                    className="w-4 h-4 text-blue-600"
                    checked={
                      selectedOption === "コンサルティング・実務研究の相談"
                    }
                    onChange={() =>
                      setSelectedOption("コンサルティング・実務研究の相談")
                    }
                  />
                  <label htmlFor="option3" className="ml-2 text-sm">
                    コンサルティング・実務研究の相談
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-start mb-2">
                <label htmlFor="title" className="text-sm">
                  案件のタイトル（必須項目）
                </label>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <input
                type="text"
                id="title"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="タイトルを入力してください"
              />
            </div>

            <div className="mb-6">
              <div className="flex items-start mb-2">
                <label htmlFor="details" className="text-sm">
                  依頼詳細
                </label>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <textarea
                id="details"
                className="w-full p-2 border border-gray-300 rounded h-32"
                placeholder="案件の背景を記載してください"
              ></textarea>
            </div>

            <div className="mb-6">
              <label htmlFor="budget" className="block text-sm mb-2">
                予算
              </label>
              <input
                type="range"
                id="budget"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2">業種</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between border-blue-200 bg-white text-left font-normal h-10"
                  >
                    <span className="text-gray-500">選択してください</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-full p-0"
                  align="start"
                  side="bottom"
                  sideOffset={4}
                >
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        {industries.map((industry) => (
                          <CommandItem
                            key={industry.value}
                            value={industry.value}
                            className="cursor-pointer"
                          >
                            <Check className="mr-2 h-4 w-4 opacity-0" />
                            {industry.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="mb-6">
              <label htmlFor="business" className="block text-sm mb-2">
                事業内容
              </label>
              <input
                type="text"
                id="business"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="事業内容を入力してください"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="university" className="block text-sm mb-2">
                大学
              </label>
              <input
                type="text"
                id="university"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="大学名を入力してください"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2">研究分野</label>
              <Select>
                <SelectTrigger className="w-full border-gray-300 bg-white">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  align="start"
                  side="bottom"
                  sideOffset={4}
                >
                  {researchFields.map((field) => (
                    <SelectItem key={field.value} value={field.value}>
                      {field.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2">研究者階層</label>
              <Select>
                <SelectTrigger className="w-full border-gray-300 bg-white">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  align="start"
                  side="bottom"
                  sideOffset={4}
                >
                  {researcherLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mb-10">
              <label className="block text-sm mb-2">募集期限</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-gray-300 bg-white h-10"
                  >
                    {date ? (
                      format(date, "yyyy/MM/dd", { locale: ja })
                    ) : (
                      <span className="text-gray-500">_ _ / _ _ / _ _</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                  side="bottom"
                  sideOffset={4}
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-10 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                確認する
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
