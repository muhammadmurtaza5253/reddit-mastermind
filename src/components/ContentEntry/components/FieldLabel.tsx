

const FieldLabel = ({ label }: { label: string }) => {
    return (
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {label}
        </label>
    )
}

export default FieldLabel;