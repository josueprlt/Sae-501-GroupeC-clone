'use client';

import { useState, useEffect } from "react";
import { SearchBar } from "@/components/ui/search/searchBar";
import { SearchInput } from "@/components/ui/search/searchInput";
import { Input } from "@/components/ui/input";
import { Clock, LocationOn, User, Filtre } from '@/components/ui/icons';
import { fetchUniqueLocations, fetchUniqueUserNames } from "@/lib/event";
import { fetchUserUniqueLocations } from "@/lib/data";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"

interface FilterProps {
  variant?: 'default' | 'noCreator';
}

export default function Filter({ variant = 'default' }: FilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [startDate, setStartDate] = useState(searchParams.get('startDate') || '');
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || '');
  const [creatorFirstname, setCreatorFirstname] = useState(searchParams.get('creatorFirstname') || '');

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      if (searchTerm) {
        params.set('query', searchTerm);
      } else {
        params.delete('query');
      }
      if (location) {
        params.set('location', location);
      } else {
        params.delete('location');
      }
      if (startDate) {
        params.set('startDate', startDate);
      } else {
        params.delete('startDate');
      }
      if (endDate) {
        params.set('endDate', endDate);
      } else {
        params.delete('endDate');
      }
      if (creatorFirstname) {
        params.set('creatorFirstname', creatorFirstname);
      } else {
        params.delete('creatorFirstname');
      }
      router.replace(`${pathname}?${params.toString()}`);
    }, 1000); // Délai de 1000ms après que l'utilisateur ait arrêté d'écrire

    return () => clearTimeout(timeoutId);
  }, [searchTerm, location, startDate, endDate, creatorFirstname]);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleCreatorFirstnameSelect = (selectedCreatorFirstname: string) => {
    setCreatorFirstname(selectedCreatorFirstname);
  };

  const locationFetchFunction = variant === 'noCreator' ? fetchUserUniqueLocations : fetchUniqueLocations;

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center gap-5'>
        <SearchBar
          id="search"
          placeholder="Rechercher"
          type="search"
          value={searchTerm}
          onChange={handleSearchTermChange}
          className='text-xs placeholder:text-FormBorder border-FormBorder md:text-base w-full'
        />
        <Button variant={'outline'}
          className='block md:hidden flex h-10 w-12 rounded-md border border-input items-center bg-background px-3 py-2 text-sm'
          onClick={toggleFilters}
        >
          <Filtre className='w-6' />
        </Button>
      </div>
      <div className={`w-full flex-col gap-5 ${showFilters ? 'flex' : 'hidden'} md:grid md:grid-cols-4`}>
        <Input
          img={<Clock className='w-4 md:w-6' />}
          type="date"
          className='text-xs placeholder:text-FormBorder border-FormBorder md:text-base bg-secondary'
          onChange={handleStartDateChange}
          value={startDate}
        />
        <Input
          img={<Clock className='w-4 md:w-6' />}
          type="date"
          className='text-xs placeholder:text-FormBorder border-FormBorder md:text-base bg-secondary'
          onChange={handleEndDateChange}
          value={endDate}
        />
        <SearchInput
          img={<LocationOn className='w-4 md:w-6' />}
          fetchOptions={locationFetchFunction}
          placeholder="Lieu"
          onSelect={handleLocationSelect}
          value={location}

        />
        {variant === 'default' && (
          <SearchInput
            img={<User className='w-4 md:w-6' />}
            fetchOptions={fetchUniqueUserNames}
            placeholder="Créateur"
            onSelect={handleCreatorFirstnameSelect}
            value={creatorFirstname}
          />
        )}
      </div>
    </div>
  );
}