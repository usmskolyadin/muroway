// components/admin/resources/tours.tsx
import {
  List, Datagrid, TextField, NumberField, EditButton,
  Edit, SimpleForm, TextInput, NumberInput, Create, ReferenceInput, SelectInput
} from 'react-admin';

export const TourList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <NumberField source="price" />
      <TextField source="location" />
      <EditButton />
    </Datagrid>
  </List>
);

export const TourEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" fullWidth />
      <NumberInput source="price" />
      <TextInput source="location" />
      <TextInput multiline source="description" />
      <ReferenceInput source="durationId" reference="durations">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="activityId" reference="activities">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput multiline source="included" />
      <TextInput multiline source="excluded" />
      <TextInput multiline source="accommodation" />
    </SimpleForm>
  </Edit>
);

export const TourCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" fullWidth />
      <NumberInput source="price" />
      <TextInput source="location" />
      <TextInput multiline source="description" />
      <ReferenceInput source="durationId" reference="durations">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="activityId" reference="activities">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput multiline source="included" />
      <TextInput multiline source="excluded" />
      <TextInput multiline source="accommodation" />
    </SimpleForm>
  </Create>
);
