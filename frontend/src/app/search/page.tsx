'use client';

import { useState, useEffect } from "react";
import Filter from "@/components/ui/search/filter";
import { useSearchParams } from 'next/navigation';
import EventsTable from '@/components/ui/search/table';
import Pagination from '@/components/ui/search/pagination';
import { fetchSearchEvents } from "@/lib/event";

const ITEMS_PER_PAGE = 9;

export default function SearchPage() {
  const searchParams = useSearchParams();

  const query = searchParams.get('query') || '';
  const location = searchParams.get('location') || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';
  const creatorFirstname = searchParams.get('creatorFirstname') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const data = await fetchSearchEvents(
      query,
      location,
      startDate,
      endDate,
      creatorFirstname,
      ITEMS_PER_PAGE,
      offset
    );
    if (data) {
      setEvents(data.events);
      setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, query, location, startDate, endDate, creatorFirstname]);
  return (
    <div className="w-full">
      <Filter />
      <EventsTable events={events} />
      <div className="mt-5 flex w-full justify-center items-start">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}