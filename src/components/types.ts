import { FC } from "react";

export enum GroupName {
  All = "All",
  Data = "Data",
  Security = "Security",
  Store = "Store",
  Tools = "Tools",
  Settings = "Settings",
}

export enum IconColor {
  All = "lightgreen",
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
  description: string;
  shortcut: string;
}
