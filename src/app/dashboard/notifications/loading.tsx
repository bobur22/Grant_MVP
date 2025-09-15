import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function NotificationsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* User Profile Header Skeleton */}
        <Card className="bg-gradient-to-r from-blue-700/50 to-blue-600/50 border-blue-600/30 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex items-center gap-4">
                <Skeleton className="w-16 h-16 rounded-full bg-blue-600/30" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-20 bg-blue-600/30" />
                  <Skeleton className="h-4 w-32 bg-blue-600/30" />
                </div>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 md:ml-8">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-blue-600/30" />
                  <Skeleton className="h-4 w-32 bg-blue-600/30" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-blue-600/30" />
                  <Skeleton className="h-4 w-40 bg-blue-600/30" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Notifications Section Skeleton */}
        <Card className="bg-blue-800/30 border-blue-600/30 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Skeleton className="w-6 h-6 bg-blue-600/30" />
              <Skeleton className="h-8 w-48 bg-blue-600/30" />
            </div>

            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-blue-700/20 rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    <Skeleton className="w-5 h-5 bg-blue-600/30" />
                    <Skeleton className="h-4 w-64 bg-blue-600/30" />
                  </div>
                  <Skeleton className="h-4 w-32 bg-blue-600/30" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
