import React, { useState } from "react";

interface FilePickerProps {
  label: string;
  name: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filePreview?: string; // URL of the preview file
  previewAlt?: string;  // Alt text for the preview image or title for the PDF
  fileType?: string;    // MIME type of the file
}

const FilePicker: React.FC<FilePickerProps> = ({
  label,
  name,
  id,
  onChange,
  filePreview,
  previewAlt = "File Preview",
  fileType,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const isImage = fileType?.startsWith("image/");
  const isPDF = fileType === "application/pdf";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      onChange(e);
    } else {
      setFileName(null);
    }
  };

  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor={id} className="block text-sm text-label dark:text-labelDark font-medium mb-1">
        {label}
      </label>
      <div className="flex items-center flex-row">
        {filePreview && isImage && (
          <img
            src={filePreview}
            alt={previewAlt}
            className="w-20 h-20 object-cover rounded-md border border-gray-300 mb-2"
          />
        )}
        {filePreview && isPDF && (
          <iframe
            src={filePreview}
            title={previewAlt}
            className="w-20 h-20 rounded-md border border-gray-300 mb-2"
          />
        )}
        <input
          type="file"
          name={name}
          id={id}
          hidden
          onChange={handleFileChange}
        />
        {fileName && (
          <span className="text-textColor dark:text-textColorDark text-md ml-4 mb-2">
            {fileName}
          </span>
        )}
      </div>
      <button
        type="button"
        className="px-4 py-2 text-label dark:text-labelDark bg-transparent border border-solid border-label dark:border-labelDark rounded-md hover:text-textColor hover:dark:text-textColorDark hover:border-textColor hover:dark:border-textColorDark"
        onClick={() => document.getElementById(id)?.click()}
      >
        {fileName ? "Choose Different File" : "Select File"}
      </button>
    </div>
  );
};

export default FilePicker;
