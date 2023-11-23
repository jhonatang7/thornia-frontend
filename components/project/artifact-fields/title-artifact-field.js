export function TitleArtifactField({ field, updateArtifact, value, disabled }) {
  const handleChange = (e) => {
    updateArtifact({ key: field.key, value: e.currentTarget.textContent });
  };

  return (
    <p
      onBlur={handleChange}
      contentEditable={!disabled}
      before={field.key}
      suppressContentEditableWarning={true}
      className="empty:before:content-[attr(before)] empty:before:text-muted-foreground border-0 focus:border-input text-4xl font-semibold tracking-tight resize-none mt-2 pl-0 p-1.5 hover:bg-accent rounded-md"
    >
      {value}
    </p>
  );
}
