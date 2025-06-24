"use client";

import * as React from "react";
import {
  Admin,
  Resource,
  List,
  Datagrid,
  TextField,
  NumberField,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  DateField,
  required,
  FileInput,
  FileField,
  BooleanInput,
  ReferenceField,
  EditProps,
  CreateProps,
  ListProps,
  EditButton,
  FunctionField,
} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import dataProvider from "@/lib/dataProvider";

// Типы для сущностей, взяты по твоей Prisma-схеме
interface Tour {
  id: number;
  title: string;
  price: number;
  location: string;
  description?: string;
  durationId: number;
  activityId: number;
  included?: string;
  excluded?: string;
  accommodation?: string;
  createdAt: string;
}

interface Duration {
  id: number;
  name: string;
}

interface Activity {
  id: number;
  name: string;
}

interface Program {
  id: number;
  dayNumber: number;
  description: string;
  tourId: number;
}

interface Image {
  id: number;
  url: string;
  programId?: number | null;
  tourId?: number | null;
  isAccommodation: boolean;
}

// --- Tours ---
const TourList: React.FC<ListProps> = (props) => (
  <List<Tour> {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <NumberField source="price" />
      <TextField source="location" />
      <ReferenceField source="durationId" reference="durations">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="activityId" reference="activities">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);

const TourEdit: React.FC<EditProps> = (props) => (
  <Edit<Tour> {...props}>
    <SimpleForm>
      <TextInput source="title" validate={required()} />
      <TextInput source="description" multiline />
      <NumberInput source="price" validate={required()} />
      <TextInput source="location" validate={required()} />
      <ReferenceInput source="durationId" reference="durations" >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="activityId" reference="activities" >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="included" multiline />
      <TextInput source="excluded" multiline />
      <TextInput source="accommodation" multiline />
      <FileInput source="images" label="Загрузить фото"  multiple>
        <FileField source="url" title="url" />
      </FileInput>
    </SimpleForm>
  </Edit>
);

const TourCreate: React.FC<CreateProps> = (props) => (
  <Create<Tour> {...props}>
    <SimpleForm>
      <TextInput source="title" validate={required()} />
      <TextInput source="description" multiline />
      <NumberInput source="price" validate={required()} />
      <TextInput source="location" validate={required()} />
      <ReferenceInput source="durationId" reference="durations" >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="activityId" reference="activities" >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="included" multiline />
      <TextInput source="excluded" multiline />
      <TextInput source="accommodation" multiline />
      <FileInput source="images" label="Загрузить фото"  multiple>
        <FileField source="url" title="url" />
      </FileInput>
    </SimpleForm>
  </Create>
);

// --- Durations ---
const DurationList: React.FC<ListProps> = (props) => (
  <List<Duration> {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
);

const DurationEdit: React.FC<EditProps> = (props) => (
  <Edit<Duration> {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
    </SimpleForm>
  </Edit>
);

const DurationCreate: React.FC<CreateProps> = (props) => (
  <Create<Duration> {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
    </SimpleForm>
  </Create>
);

// --- Activities ---
const ActivityList: React.FC<ListProps> = (props) => (
  <List<Activity> {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
);

const ActivityEdit: React.FC<EditProps> = (props) => (
  <Edit<Activity> {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
    </SimpleForm>
  </Edit>
);

const ActivityCreate: React.FC<CreateProps> = (props) => (
  <Create<Activity> {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
    </SimpleForm>
  </Create>
);

// --- Programs ---
const ProgramList: React.FC<ListProps> = (props) => (
  <List<Program> {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <NumberField source="dayNumber" />
      <TextField source="description" />
      <ReferenceField source="tourId" reference="tours">
        <TextField source="title" />
      </ReferenceField>
    </Datagrid>
  </List>
);

const ProgramEdit: React.FC<EditProps> = (props) => (
  <Edit<Program> {...props}>
    <SimpleForm>
      <NumberInput source="dayNumber" validate={required()} />
      <TextInput source="description" multiline validate={required()} />
      <ReferenceInput source="tourId" reference="tours">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

const ProgramCreate: React.FC<CreateProps> = (props) => (
  <Create<Program> {...props}>
    <SimpleForm>
      <NumberInput source="dayNumber" validate={required()} />
      <TextInput source="description" multiline validate={required()} />
      <ReferenceInput source="tourId" reference="tours">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

// --- Images ---
const ImageList: React.FC<ListProps> = (props) => (
  <List<Image> {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="url" />
      <BooleanInput source="isAccommodation" />
      <ReferenceField source="programId" reference="programs" link="show" emptyText="-">
        <TextField source="description" />
      </ReferenceField>
      <ReferenceField source="tourId" reference="tours" link="show" emptyText="-" >
        <TextField source="title" />
      </ReferenceField>
    </Datagrid>
  </List>
);

const ImageEdit: React.FC<EditProps> = (props) => (
  <Edit<Image> {...props}>
    <SimpleForm>
      <TextInput source="url" validate={required()} />
      <BooleanInput source="isAccommodation" />
      <ReferenceInput source="programId" reference="programs" allowEmpty>
        <SelectInput optionText="description" />
      </ReferenceInput>
      <ReferenceInput source="tourId" reference="tours" allowEmpty>
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

const ImageCreate: React.FC<CreateProps> = (props) => (
  <Create<Image> {...props}>
    <SimpleForm>
      <TextInput source="url" validate={required()} />
      <BooleanInput source="isAccommodation" />
      <ReferenceInput source="programId" reference="programs" allowEmpty>
        <SelectInput optionText="description" />
      </ReferenceInput>
      <ReferenceInput source="tourId" reference="tours" allowEmpty>
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
export const BookingList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="phone" />
      <TextField source="telegram" />
      <ReferenceField source="tourId" reference="tours">
        <TextField source="title" />
      </ReferenceField>

      {/* ✅ Correctly render status as readable label */}
      <FunctionField
        source="status"
        label="Status"
        render={record => {
          const statusMap = {
            pending: 'Pending',
            confirmed: 'Confirmed',
            canceled: 'Canceled',
          }
          return statusMap[record.status] || record.status
        }}
      />

      <DateField source="createdAt" showTime />
      <EditButton />
    </Datagrid>
  </List>
)

export const BookingEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" fullWidth />
      <TextInput source="phone" fullWidth />
      <TextInput source="telegram" fullWidth />
      <ReferenceInput source="tourId" reference="tours">
        <SelectInput optionText="title" />
      </ReferenceInput>
      <SelectInput
        source="status"
        choices={[
          { id: 'pending', name: 'Pending' },
          { id: 'confirmed', name: 'Confirmed' },
          { id: 'canceled', name: 'Canceled' },
        ]}
      />
    </SimpleForm>
  </Edit>
)

const AdminApp: React.FC = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="bookings" list={BookingList} edit={BookingEdit} />
    <Resource name="tours" list={TourList} edit={TourEdit} create={TourCreate} />
    <Resource name="durations" list={DurationList} edit={DurationEdit} create={DurationCreate} />
    <Resource name="activities" list={ActivityList} edit={ActivityEdit} create={ActivityCreate} />
    <Resource name="programs" list={ProgramList} edit={ProgramEdit} create={ProgramCreate} />
    <Resource name="images" list={ImageList} edit={ImageEdit} create={ImageCreate} />
  </Admin>
);

export default AdminApp;
