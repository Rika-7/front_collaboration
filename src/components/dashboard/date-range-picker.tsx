"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [startDate, setStartDate] = React.useState<Date>(new Date(2025, 0, 1));
  const [endDate, setEndDate] = React.useState<Date>(new Date(2025, 2, 31));

  // 年の選択肢を生成（現在の年から前後2年）
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  // 月の選択肢
  const months = [
    { value: "0", label: "1月" },
    { value: "1", label: "2月" },
    { value: "2", label: "3月" },
    { value: "3", label: "4月" },
    { value: "4", label: "5月" },
    { value: "5", label: "6月" },
    { value: "6", label: "7月" },
    { value: "7", label: "8月" },
    { value: "8", label: "9月" },
    { value: "9", label: "10月" },
    { value: "10", label: "11月" },
    { value: "11", label: "12月" },
  ];

  // 日の選択肢を生成（選択された年と月に基づく）
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startDays = Array.from(
    { length: getDaysInMonth(startDate.getFullYear(), startDate.getMonth()) },
    (_, i) => i + 1
  );

  const endDays = Array.from(
    { length: getDaysInMonth(endDate.getFullYear(), endDate.getMonth()) },
    (_, i) => i + 1
  );

  const handleStartYearChange = (value: string) => {
    const newDate = new Date(startDate);
    newDate.setFullYear(Number.parseInt(value));
    setStartDate(newDate);
  };

  const handleStartMonthChange = (value: string) => {
    const newDate = new Date(startDate);
    newDate.setMonth(Number.parseInt(value));
    // 月が変わったときに日付が範囲外にならないように調整
    const daysInMonth = getDaysInMonth(
      newDate.getFullYear(),
      Number.parseInt(value)
    );
    if (newDate.getDate() > daysInMonth) {
      newDate.setDate(daysInMonth);
    }
    setStartDate(newDate);
  };

  const handleStartDayChange = (value: string) => {
    const newDate = new Date(startDate);
    newDate.setDate(Number.parseInt(value));
    setStartDate(newDate);
  };

  const handleEndYearChange = (value: string) => {
    const newDate = new Date(endDate);
    newDate.setFullYear(Number.parseInt(value));
    setEndDate(newDate);
  };

  const handleEndMonthChange = (value: string) => {
    const newDate = new Date(endDate);
    newDate.setMonth(Number.parseInt(value));
    // 月が変わったときに日付が範囲外にならないように調整
    const daysInMonth = getDaysInMonth(
      newDate.getFullYear(),
      Number.parseInt(value)
    );
    if (newDate.getDate() > daysInMonth) {
      newDate.setDate(daysInMonth);
    }
    setEndDate(newDate);
  };

  const handleEndDayChange = (value: string) => {
    const newDate = new Date(endDate);
    newDate.setDate(Number.parseInt(value));
    setEndDate(newDate);
  };

  const formatDateRange = () => {
    return `${format(startDate, "LLL dd, yyyy")} - ${format(
      endDate,
      "LLL dd, yyyy"
    )}`;
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[300px] justify-start text-left font-normal")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="grid gap-4">
            <div>
              <h3 className="mb-2 font-medium">開始日</h3>
              <div className="flex gap-2">
                <Select
                  value={startDate.getFullYear().toString()}
                  onValueChange={handleStartYearChange}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="年" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}年
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={startDate.getMonth().toString()}
                  onValueChange={handleStartMonthChange}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="月" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={startDate.getDate().toString()}
                  onValueChange={handleStartDayChange}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="日" />
                  </SelectTrigger>
                  <SelectContent>
                    {startDays.map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}日
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-medium">終了日</h3>
              <div className="flex gap-2">
                <Select
                  value={endDate.getFullYear().toString()}
                  onValueChange={handleEndYearChange}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="年" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}年
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={endDate.getMonth().toString()}
                  onValueChange={handleEndMonthChange}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="月" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={endDate.getDate().toString()}
                  onValueChange={handleEndDayChange}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="日" />
                  </SelectTrigger>
                  <SelectContent>
                    {endDays.map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}日
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
