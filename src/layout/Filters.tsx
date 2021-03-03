import * as React from 'react';
import Form from 'react-bootstrap/Form';
import { IFilter } from '../models/filter.model';

type Props = {
  sections: IFilter[];
}

function Filters(props: Props) {
  const {sections} = props;
const onChangeHandler = (toggleHandler: any, id: any) => {
  toggleHandler(id);
}
  return (
<Form>
  {sections.map((filterSection: IFilter, index: number) => (
    <div key={`filter-${index}`} className="mb-3">
      {filterSection.options.map((option: any, optionIndex: number) => (
      <Form.Check
        type="checkbox"
        key={`checkbox-${index}-${optionIndex}`}
        value={option[filterSection.primaryKey]}
        onChange={() => onChangeHandler(filterSection.onToggleHandler, option[filterSection.primaryKey])}
        id={`checkbox-${index}`}
        label={option[filterSection.displayProperty]}
      />
      ))}
    </div>
  ))}
</Form>
  )
}

export default Filters;
