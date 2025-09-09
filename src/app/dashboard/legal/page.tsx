import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale } from "lucide-react"

export default function LegalPage() {
  return (
    <div className="flex-1 p-6">
      <Card className="bg-[#1e3a8a] border-blue-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
              <Scale className="w-5 h-5 text-blue-600" />
            </div>
            <CardTitle className="text-white text-2xl">Huquqiy Savollar</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-blue-200">
            Bu sahifada huquqiy masalalar va savollar bo'yicha ma'lumotlar joylashtiriladi.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
