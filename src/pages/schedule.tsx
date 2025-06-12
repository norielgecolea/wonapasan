
import React, { useState } from "react"
import Head from "next/head"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Edit, Plus } from "lucide-react"
import Link from "next/link"
import scheduleJson  from "@/data/schedule.json";

const mockScheduleData = {
  
}

const roleColors = {
  "LEAD": "bg-blue-900/50 text-blue-300 border-blue-700",
  "GATHERING/DECLARATION": "bg-indigo-900/50 text-indigo-300 border-indigo-700",
  "BACKUP VOCALS": "bg-slate-700/50 text-slate-300 border-slate-600",
  "KEYBOARD": "bg-red-900/50 text-red-300 border-red-700",
  "ELECTRIC GUITAR": "bg-cyan-900/50 text-cyan-300 border-cyan-700",
  "RHYTHM GUITAR": "bg-green-900/50 text-green-300 border-green-700",
  "BASS": "bg-yellow-900/50 text-yellow-300 border-yellow-700",
  "DRUMS": "bg-purple-900/50 text-purple-300 border-purple-700"
}

export default function Schedule() {
  const [selectedQuarter, setSelectedQuarter] = useState("Q2-2025")
  const [selectedMonth, setSelectedMonth] = useState("June")
  
  const currentData = scheduleJson[selectedQuarter]
  const scheduleData = currentData?.schedule[selectedMonth] || []

  return (
    <>
      <Head>
        <title>Worship Schedule - Worship Team Scheduler</title>
        <meta name="description" content="View and manage worship team schedules" />
      </Head>
      
      <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-white">Worship Schedule</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select Quarter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Q2-2025">Q2 2025</SelectItem>
                <SelectItem value="Q3-2025">Q3 2025</SelectItem>
                <SelectItem value="Q4-2025">Q4 2025</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {currentData?.months.map((month) => (
                  <SelectItem key={month} value={month}>{month}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>

          <Card className="border-slate-700 bg-slate-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5" />
                {selectedMonth} {currentData?.quarter} Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-slate-600">
                      <th className="text-left p-3 font-semibold bg-slate-700/50 text-white">TASK</th>
                      {scheduleData.map((service) => (
                        <th key={service.date} className="text-center p-3 font-semibold bg-green-700 text-white min-w-32">
                          {service.date}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(roleColors).map((role) => (
                      <tr key={role} className="border-b border-slate-600 hover:bg-slate-700/30">
                        <td className={`p-3 font-medium ${roleColors[role]} border-r border-slate-600`}>
                          {role}
                        </td>
                        {scheduleData.map((service) => (
                          <td key={`${role}-${service.date}`} className="p-3 text-center border-r border-slate-600">
                            {Array.isArray(service.assignments[role]) ? (
                              <div className="space-y-1">
                                {service.assignments[role].map((person, index) => (
                                  <Badge key={index} variant="secondary" className="block bg-slate-600 text-slate-200">
                                    {person}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              service.assignments[role] && (
                                <Badge variant="secondary" className="bg-slate-600 text-slate-200">
                                  {service.assignments[role]}
                                </Badge>
                              )
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 hidden">
              <Edit className="w-4 h-4 mr-2" />
              Edit Schedule
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
