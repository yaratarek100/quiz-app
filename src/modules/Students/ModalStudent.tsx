import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Student } from "@/Interfaces/StudentsInteface"

export function ModalStudent({
  open,
  setOpen,
  student,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  student: Student
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 text-sm text-gray-800">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block font-semibold mb-1">First Name:</span>
              <div className="bg-gray-100 rounded px-3 py-2">{student?.first_name}</div>
            </div>
            <div>
              <span className="block font-semibold mb-1">Last Name:</span>
              <div className="bg-gray-100 rounded px-3 py-2">{student?.last_name}</div>
            </div>
          </div>

          <div>
            <span className="block font-semibold mb-1">Email:</span>
            <div className="bg-gray-100 rounded px-3 py-2">{student?.email}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block font-semibold mb-1">Group:</span>
              <div className="bg-gray-100 rounded px-3 py-2">{student?.group?.name}</div>
            </div>
            <div>
              <span className="block font-semibold mb-1">Status:</span>
              <div className="bg-gray-100 rounded px-3 py-2">{student?.status}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
