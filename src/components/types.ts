import { FC } from "react";

export enum GroupName {
  All = "All",
  Data = "Data",
  Security = "Security",
  Store = "Store",
  Tools = "Tools",
  Settings = "Settings",
}

export enum Mode {
  Main = "main",
  Command = "command",
}

export enum IconColor {
  All = "lightgreen",
  Command = "white",
  Data = "blue",
  Security = "purple",
  Store = "grey",
  Tools = "lightblue",
  Settings = "lightgray",
}

export interface Group {
  icon: FC;
  iconColor: IconColor;
  name: GroupName;
}

export interface Section {
  icon: FC;
  iconColor: IconColor;
  group: GroupName;
  name: string;
  labels?: Array<string>;
  description: string;
  shortcut?: string;
}
