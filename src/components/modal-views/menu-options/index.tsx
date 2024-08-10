
interface Props {
  onClose: () => void;
  options: {
    label: string;
    className: string;
    onClick: () => void;
    dataCy: string;
  }[];
}
const MenuOptions = ({ onClose, options }: Props) => {
  return (
    <ul className="modal flex flex-col" data-cy="modal-menu-options">
      {options.map((item, index) => (
        <li
          key={index}
          className={`${item.className} w-full hover:bg-slate-200 font-semibold cursor-pointer p-4 text-center`}
          onClick={item.onClick}
          data-cy={item.dataCy}
        >
          {item.label}
        </li>
      ))}
      <li
        key={`options-close`}
        className={`w-full hover:bg-slate-200 font-semibold cursor-pointer p-4 text-center`}
        onClick={onClose}
      >
        Cancel
      </li>
    </ul>
  )
}

export default MenuOptions
