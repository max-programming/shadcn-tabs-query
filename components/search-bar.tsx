'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounceCallback } from 'usehooks-ts';
import { Input } from './ui/input';

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounce = useDebounceCallback(handleSearchTitle, 500);
  const title = searchParams.get('title') ?? '';

  function handleSearchTitle(value: string) {
    const sp = new URLSearchParams(searchParams);
    if (value.trim() === '') {
      sp.delete('title');
    } else {
      sp.set('title', value);
    }
    router.push(`${pathname}?${sp.toString()}`);
  }

  return (
    <Input
      placeholder='Search title here...'
      className='my-5'
      onChange={e => debounce(e.target.value)}
      defaultValue={title}
    />
  );
}
