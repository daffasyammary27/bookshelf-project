export function BookSkeleton() {
  return (
    <div className="p-3">
      <div className="aspect-[3/4] skeleton-gradient mb-4" />
      <div className="h-3 w-1/4 skeleton-gradient mb-2" />
      <div className="h-4 skeleton-gradient mb-1 w-full" />
      <div className="h-4 skeleton-gradient w-2/3" />
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-1/3 aspect-[3/4] skeleton-gradient" />
        <div className="flex-1 space-y-8">
          <div className="h-4 w-24 skeleton-gradient" />
          <div className="h-12 w-3/4 skeleton-gradient" />
          <div className="h-6 w-1/2 skeleton-gradient" />
          <div className="space-y-4 pt-8">
            <div className="h-4 w-full skeleton-gradient" />
            <div className="h-4 w-full skeleton-gradient" />
            <div className="h-4 w-2/3 skeleton-gradient" />
          </div>
        </div>
      </div>
    </div>
  );
}
