import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export function PaginateTodo({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) {
  return (
    <Pagination className="mt-2">
      {Array.from({ length: totalPages }).map((_, index) => (
        <PaginationContent key={index}>
          <PaginationItem className={`${index === 0 ? 'block' : 'hidden'} `}>
            <PaginationPrevious
              href={currentPage > 1 ? (currentPage - 1).toString() : '#'}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href={(index + 1).toString()}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem
            className={`${index + 1 === totalPages ? 'block' : 'hidden'}`}
          >
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem
            className={`${index + 1 === totalPages ? 'block' : 'hidden'}`}
          >
            <PaginationNext
              href={
                currentPage < totalPages ? (currentPage + 1).toString() : '#'
              }
            />
          </PaginationItem>
        </PaginationContent>
      ))}
    </Pagination>
  );
}
