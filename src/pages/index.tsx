
import React from "react"
import Head from "next/head"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Music, Settings } from "lucide-react"
import Link from "next/link"
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>WON APASAN WORSHIP TEAM</title>
        <meta name="description" content="Church worship team scheduling system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4 py-8   ">
          <div className="container mx-auto  justify-items-center sm:justify-items-center md:justify-items-center lg:flex lg:justify-center gap-10">

            <Image
              src="/wonapasan/won_logo.png" // or a remote URL
              alt="Example Image"
              width={200} // required
              height={200} // required
              className="h-32 w-auto my-5"
            />
            <div className="text-center mb-12 ">

              <h1 className="text-4xl font-bold text-white mb-4">
                WON APASAN WORSHIP TEAM
              </h1>

              <p className="text-sm text-slate-300 max-w-2xl mx-auto">
                "Speaking to one another with psalms, hymns, and spiritual songs, singing and
                making melody to the Lord with your hearts; always giving thanks to God the Father for everything,
                in the name of our Lord Jesus Christ"
              </p>
              <p className="text-xl text-slate-100 max-w-2xl mx-auto text-right">
                Ephesians 5:19-20.
              </p>
            </div>







          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow border-slate-700 bg-slate-800/50">
              <CardHeader className="text-center">
                <Calendar className="w-12 h-12 mx-auto text-blue-400 mb-2" />
                <CardTitle className="text-white">Current Schedule</CardTitle>
                <CardDescription className="text-slate-400">View this quarter's worship schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/schedule">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">View Schedule</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-slate-700 bg-slate-800/50">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 mx-auto text-green-400 mb-2" />
                <CardTitle className="text-white">Team Members</CardTitle>
                <CardDescription className="text-slate-400">Manage worship team members</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/team">
                  <Button className="w-full" variant="outline">Manage Team</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-slate-700 bg-slate-800/50">
              <CardHeader className="text-center">
                <Music className="w-12 h-12 mx-auto text-purple-400 mb-2" />
                <CardTitle className="text-white">Roles & Tasks</CardTitle>
                <CardDescription className="text-slate-400">Configure worship roles</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/roles">
                  <Button className="w-full" variant="outline">Setup Roles</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-slate-700 bg-slate-800/50">
              <CardHeader className="text-center">
                <Settings className="w-12 h-12 mx-auto text-orange-400 mb-2" />
                <CardTitle className="text-white">Settings</CardTitle>
                <CardDescription className="text-slate-400">Configure schedule settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/settings">
                  <Button className="w-full" variant="outline">Settings</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-4xl mx-auto border-slate-700 bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Quick Overview</CardTitle>
              <CardDescription className="text-slate-400">Current quarter schedule summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-800/50">
                  <h3 className="font-semibold text-blue-300">Current Quarter</h3>
                  <p className="text-2xl font-bold text-blue-400">Q2 2025</p>
                  <p className="text-sm text-blue-300">April - June</p>
                </div>
                <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-800/50">
                  <h3 className="font-semibold text-green-300">Team Members</h3>
                  <p className="text-2xl font-bold text-green-400">12</p>
                  <p className="text-sm text-green-300">Active members</p>
                </div>
                <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-800/50">
                  <h3 className="font-semibold text-green-300">Trainees</h3>
                  <p className="text-2xl font-bold text-green-400">4</p>
                  <p className="text-sm text-green-300">Active members</p>
                </div>
                <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-800/50">
                  <h3 className="font-semibold text-purple-300">Services</h3>
                  <p className="text-2xl font-bold text-purple-400">13</p>
                  <p className="text-sm text-purple-300">This quarter</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
