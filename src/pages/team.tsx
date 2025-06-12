import React, { useState } from "react"
import Head from "next/head"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Users, Plus, Edit, Trash2, Mail, Phone, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface TeamMember {
  id: string
  name: string
  email: string
  phone: string
  role: string
  instruments: string[]
  availability: string
  notes: string
  joinDate: string
  status: "active" | "inactive"
}

const roles = [
  "Worship Leader",
  "Lead Vocalist",
  "Backup Vocals",
  "Acoustic Guitar",
  "Electric Guitar",
  "Bass Guitar",
  "Drums",
  "Keys/Piano",
  "Sound Tech",
  "Media/Visuals"
]

const instruments = [
  "Vocals",
  "Acoustic Guitar",
  "Electric Guitar",
  "Bass Guitar",
  "Drums",
  "Keys",
  "Piano",
  "Violin",
  "Saxophone",
  "Trumpet"
]

export default function ManageTeam() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Noriel Gecolea",
      email: "norielgecolea23@gmail.com",
      phone: "(555) 123-4567",
      role: "Keys/Piano",
      instruments: ["Vocals", "Acoustic Guitar"],
      availability: "Sundays",
      notes: "asdasd",
      joinDate: "2023-01-15",
      status: "active"
    },
    {
      id: "2",
      name: "Mark Reyes",
      email: "Mark Reyes@church.com",
      phone: "(555) 234-5678",
      role: "Worship Leader",
      instruments: ["Electric Guitar", "Bass Guitar","Vocals"],
      availability: "Sundays only",
      notes: "Prefers contemporary songs",
      joinDate: "2023-03-20",
      status: "inactive"
    },
    {
      id: "3",
      name: "John Lester Aguila",
      email: "emily@church.com",
      phone: "(555) 345-6789",
      role: "Sound Tech",
      instruments: ["Piano", "Keys"],
      availability: "Flexible schedule",
      notes: "Classical training background",
      joinDate: "2023-02-10",
      status: "active"
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    instruments: [] as string[],
    availability: "",
    notes: "",
    status: "active" as "active" | "inactive"
  })

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      instruments: [],
      availability: "",
      notes: "",
      status: "active"
    })
  }

  const handleAddMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      ...formData,
      joinDate: new Date().toISOString().split("T")[0]
    }
    setTeamMembers([...teamMembers, newMember])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditMember = () => {
    if (!editingMember) return
    
    setTeamMembers(teamMembers.map(member => 
      member.id === editingMember.id 
        ? { ...editingMember, ...formData }
        : member
    ))
    setEditingMember(null)
    resetForm()
  }

  const handleDeleteMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id))
  }

  const openEditDialog = (member: TeamMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      role: member.role,
      instruments: member.instruments,
      availability: member.availability,
      notes: member.notes,
      status: member.status
    })
  }

  const toggleInstrument = (instrument: string) => {
    setFormData(prev => ({
      ...prev,
      instruments: prev.instruments.includes(instrument)
        ? prev.instruments.filter(i => i !== instrument)
        : [...prev.instruments, instrument]
    }))
  }

  return (
    <>
      <Head>
        <title>Manage Team - Worship Team Scheduler</title>
        <meta name="description" content="Manage your worship team members" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Users className="w-8 h-8" />
                  Manage Team
                </h1>
                <p className="text-blue-200 mt-1">Add, edit, and organize your worship team members</p>
              </div>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Team Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Primary Role</Label>
                      <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map(role => (
                            <SelectItem key={role} value={role}>{role}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Instruments/Skills</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {instruments.map(instrument => (
                        <Badge
                          key={instrument}
                          variant={formData.instruments.includes(instrument) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleInstrument(instrument)}
                        >
                          {instrument}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Input
                      id="availability"
                      value={formData.availability}
                      onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                      placeholder="e.g., Sundays, Wednesdays, Special Events"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Additional notes about the team member"
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddMember} disabled={!formData.name || !formData.role}>
                      Add Member
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Team Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-white">{teamMembers.filter(m => m.status === "active").length}</div>
                <div className="text-blue-200 text-sm">Active Members</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-white">{teamMembers.filter(m => m.status === "active" && m.instruments.includes("Vocals")).length}</div>
                <div className="text-blue-200 text-sm">Vocalists</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-white">{teamMembers.filter(m => m.status === "active" && m.role.includes("Guitar") || m.role.includes("Bass") || m.role.includes("Drums") || m.role.includes("Keys")).length}</div>
                <div className="text-blue-200 text-sm">Musicians</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-white">{teamMembers.filter(m => m.status === "active" && m.role.includes("Tech") || m.role.includes("Media")).length}</div>
                <div className="text-blue-200 text-sm">Tech Team</div>
              </CardContent>
            </Card>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map(member => (
              <Card key={member.id} className="bg-white/10 border-white/20 hover:bg-white/15 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-lg">{member.name}</CardTitle>
                      <p className="text-blue-200 text-sm">{member.role}</p>
                    </div>
                    <Badge variant={member.status === "active" ? "default" : "secondary"}>
                      {member.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-blue-200 text-sm">
                    <Mail className="w-4 h-4" />
                    {member.email}
                  </div>
                  <div className="flex items-center gap-2 text-blue-200 text-sm">
                    <Phone className="w-4 h-4" />
                    {member.phone}
                  </div>
                  <div className="flex items-center gap-2 text-blue-200 text-sm">
                    <Calendar className="w-4 h-4" />
                    Joined {new Date(member.joinDate).toLocaleDateString()}
                  </div>
                  
                  <div>
                    <p className="text-white text-sm font-medium mb-1">Instruments:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.instruments.map(instrument => (
                        <Badge key={instrument} variant="outline" className="text-xs">
                          {instrument}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-white text-sm font-medium">Availability:</p>
                    <p className="text-blue-200 text-sm">{member.availability}</p>
                  </div>

                  {member.notes && (
                    <div>
                      <p className="text-white text-sm font-medium">Notes:</p>
                      <p className="text-blue-200 text-sm">{member.notes}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => openEditDialog(member)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Team Member</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="edit-name">Full Name</Label>
                              <Input
                                id="edit-name"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-role">Primary Role</Label>
                              <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {roles.map(role => (
                                    <SelectItem key={role} value={role}>{role}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="edit-email">Email</Label>
                              <Input
                                id="edit-email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-phone">Phone</Label>
                              <Input
                                id="edit-phone"
                                value={formData.phone}
                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                              />
                            </div>
                          </div>

                          <div>
                            <Label>Instruments/Skills</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {instruments.map(instrument => (
                                <Badge
                                  key={instrument}
                                  variant={formData.instruments.includes(instrument) ? "default" : "outline"}
                                  className="cursor-pointer"
                                  onClick={() => toggleInstrument(instrument)}
                                >
                                  {instrument}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="edit-availability">Availability</Label>
                            <Input
                              id="edit-availability"
                              value={formData.availability}
                              onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                            />
                          </div>

                          <div>
                            <Label htmlFor="edit-status">Status</Label>
                            <Select value={formData.status} onValueChange={(value: "active" | "inactive") => setFormData(prev => ({ ...prev, status: value }))}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="edit-notes">Notes</Label>
                            <Textarea
                              id="edit-notes"
                              value={formData.notes}
                              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                              rows={3}
                            />
                          </div>

                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setEditingMember(null)}>
                              Cancel
                            </Button>
                            <Button onClick={handleEditMember}>
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                      onClick={() => handleDeleteMember(member.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {teamMembers.length === 0 && (
            <Card className="bg-white/10 border-white/20">
              <CardContent className="text-center py-12">
                <Users className="w-16 h-16 text-blue-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Team Members Yet</h3>
                <p className="text-blue-200 mb-4">Start building your worship team by adding your first member.</p>
                <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Member
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}