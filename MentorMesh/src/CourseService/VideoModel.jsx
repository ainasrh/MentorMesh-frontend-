import { Dialog } from "@headlessui/react";
import ReactPlayer from "react-player";

export function VideoModal({ isOpen, setIsOpen, videoUrl }) {
  return (
    // when we click out side onclose function will trigger
    // Open take boolean value when it true dialog will show 
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white max-w-4xl w-full rounded-lg p-4 shadow-xl">
          <ReactPlayer url={videoUrl} width="100%" height="100%" controls />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
 