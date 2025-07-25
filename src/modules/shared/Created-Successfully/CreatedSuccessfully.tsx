import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import confirmPhoto from "../../../assets/images/confirmPhoto.svg";
import { FaCopy } from "react-icons/fa";
import type { CreatedSuccessfullyProps } from "@/Interfaces/QuizInterface";

export default function CreatedSuccessfully({
  openSuccessDialog,
  setOpenSuccessDialog,
  itemType,
  code,
}: CreatedSuccessfullyProps) {
  const [loading, _setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <>
      {openSuccessDialog && (
        <Dialog open={openSuccessDialog} onOpenChange={setOpenSuccessDialog}>
          <DialogContent className="max-w-md w-full">
            <DialogHeader>
              <img
                src={confirmPhoto}
                alt="Warning"
                className="mx-auto mb-4 w-20 h-20"
              />
              <DialogTitle className="text-center">
                {itemType} was successfully created
              </DialogTitle>
              <div className="relative col-span-3">
                <label
                  htmlFor="code"
                  className="font-bold absolute left-0 top-0 text-sm  text-white px-3 py-2 h-10 z-10 rounded"
                >
                  CODE :
                </label>

                <div className="flex items-center pl-[60px] pr-10 py-2 h-10  w-full border border-gray-300 rounded-[10px] bg-white">
                  <span className="text-slate-800 text-sm truncate  px-5">{code}</span>
                  <button
                    onClick={handleCopy}
                    className="ml-auto text-gray-500 hover:text-slate-800"
                    title="Copy code"
                  >
                    <FaCopy className="text-slate-800" size={18} />
                  </button>
                </div>

                {copied && (
                  <p className="text-yellow-400 text-xs mt-1">
                    Copied to clipboard!
                  </p>
                )}
              </div>
            </DialogHeader>

            <DialogFooter>
              <button
                onClick={() => setOpenSuccessDialog(false)}
                disabled={loading}
                className="px-10 py-2  text-white font-semibold rounded-[20px] hover:opacity-70 bg-yellow-300 transition mx-auto"
              >
                {loading ? "Closing..." : "Close"}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
