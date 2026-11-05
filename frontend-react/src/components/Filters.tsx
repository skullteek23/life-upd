import DateButton from './buttons/DateButton';
import ResetButton from './buttons/ResetButton';

interface IFilter {
  data: (e: string) => void;
  list: any[];
}

export function DateFilter(props: IFilter) {
  return (
    <div className="filter custom-filter" id="filter">
      <ResetButton action={applyFilter.bind(null, props, '')}></ResetButton>
      <div className="dynamic-filter">
        {props.list.map((f) => (
          <DateButton key={f.value} label={f.label} action={applyFilter.bind(null, props, f.value)} />
        ))}
      </div>
    </div>
  );
}

export function CategoryFilter(props: IFilter) {
  return (
    <div className="filter custom-filter" id="filter">
      <ResetButton action={applyFilter.bind(null, props, '')}></ResetButton>
      <div className="dynamic-filter">
        {props.list.map((f) => (
          <button className="selectable-btn icon-btn" type="button" key={f.value} onClick={applyFilter.bind(null, props, f.value)}>
            <img className="action-element-img" src={f.imgSrc} alt={f.label} />
          </button>
        ))}
      </div>
    </div>
  );
}

function applyFilter(props: IFilter, value: string, e?: React.MouseEvent<HTMLButtonElement>) {
  changeSelection(e);
  const filterValue = props.list.find((f) => f.value === value)?.value || '';
  props.data(filterValue);
}

function changeSelection(e: React.MouseEvent<HTMLButtonElement> | undefined) {
  if (e) {
    const parent = e.currentTarget.parentElement;
    parent?.querySelectorAll('.selectable-btn').forEach((element) => element.classList.remove('selected'));
    e.currentTarget.classList.add('selected');
  }
}
