import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { Student } from "@/Interfaces/StudentsInteface"

export function ModalStudent({open,setOpen,student}:{
    open:boolean,  
    setOpen: (open: boolean) => void,
    student:Student
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader >
          <DialogTitle>Student Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
      <div>      
        <label className="bg-[#f8984f] px-2 py-1 rounded mb-2 text-white ">
    First Name:
  </label>
            <Input
   className="mt-4  focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none"
             readOnly
              defaultValue= {student?.first_name}
            />
            </div>
           <div> 
            <label className="bg-[#f8984f] px-2 py-1 rounded  text-white ">
    Last Name:
  </label>
            <Input
             readOnly
                defaultValue= {student?.last_name}
                className="mt-4  focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none"
            />
            </div>

          </div>
          <div className="grid grid-cols-1 items-center gap-4">
          <div>    <label className="bg-[#f8984f] px-2 py-1 rounded mb-2 text-white ">
    Email:
  </label>
            <Input
className="mt-4  focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none"
              defaultValue={student?.email}
      
              readOnly
            /></div>
          </div>
     
          <div className="grid grid-cols-2 items-center gap-4">
                 <div>
            <label className="bg-[#f8984f] px-2 py-1 rounded mb-2 text-white ">
    Group:
  </label>
             <Input
className="mt-4  focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none"
              defaultValue={student?.group.name}
      
              readOnly
            />
           </div>
            <div>
 <label className="bg-[#f8984f] px-2 py-1 rounded mb-2 text-white ">
 Status:

  </label>
            <Input
className="mt-4 focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none"
defaultValue={student?.status}

readOnly
/>
</div>
          </div>
        </div>
        
      </DialogContent>
    </Dialog>
  )
}
