import { useState } from "react";

export default function TourDescription({ description }: { description: string }) {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div>
      <p
        className={`text-[#585B5F] text-md font-medium mt-2 transition-all duration-300 ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {description}
      </p>

      {!expanded && (
        <div className="flex w-full justify-end mt-1">
          <button
            onClick={() => setExpanded(true)}
            className="text-black text-md font-medium underline"
          >
            Читать всё
          </button>
        </div>
      )}
    </div>
  );
}
