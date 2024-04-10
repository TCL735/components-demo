import { FC } from "react";
import {
  IconAlertTriangle,
  IconBinaryTree,
  IconBrandAws,
  IconBrandGithub,
  IconBuildingWarehouse,
  IconCheckbox,
  IconCompass,
  IconDatabase,
  IconDog,
  IconEye,
  IconFileDescription,
  IconFolderOpen,
  IconHexagonNumber3,
  IconKey,
  IconLock,
  IconPlus,
  IconSettings,
  IconSettingsBolt,
  IconSettingsDollar,
  IconSquareLetterS,
  IconSum,
  IconSwitch3,
  IconTelescope,
  IconTool,
  IconTournament,
  IconUserCheck,
} from "@tabler/icons-react";

export enum GroupName {
  Data = "Data",
  Security = "Security",
  Store = "Store",
  Tools = "Tools",
  Settings = "Settings",
}

enum IconColor {
  Data = "blue",
  Security = "purple",
  Store = "grey",
  Tools = "lightblue",
  Settings = "lightgray",
}

export interface Group {
  icon: FC;
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

export const groups: Array<Group> = [
  {
    icon: IconDatabase,
    name: GroupName.Data,
  },
  {
    icon: IconLock,
    name: GroupName.Security,
  },
  {
    icon: IconBuildingWarehouse,
    name: GroupName.Store,
  },
  {
    icon: IconTool,
    name: GroupName.Tools,
  },
  {
    icon: IconSettings,
    name: GroupName.Settings,
  },
];

export const sections: Array<Section> = [
  {
    icon: IconFolderOpen,
    iconColor: IconColor.Data,
    group: GroupName.Data,
    name: "Catalog",
    description: "Description of application",
    shortcut: "⌥ C",
  },
  {
    icon: IconEye,
    iconColor: IconColor.Data,
    group: GroupName.Data,
    name: "Observability",
    description: "Description of application",
    shortcut: "⌥ O",
  },
  {
    icon: IconTournament,
    iconColor: IconColor.Data,
    group: GroupName.Data,
    name: "Lineage",
    description: "Description of application",
    shortcut: "⌥ L",
  },
  {
    icon: IconSwitch3,
    iconColor: IconColor.Data,
    group: GroupName.Data,
    name: "ETL",
    description: "Description of application",
    shortcut: "⌥ E",
  },

  {
    icon: IconUserCheck,
    iconColor: IconColor.Security,
    group: GroupName.Security,
    name: "Access",
    description: "Description of application",
    shortcut: "⌥ A",
  },
  {
    icon: IconAlertTriangle,
    iconColor: IconColor.Security,
    group: GroupName.Security,
    name: "Logs",
    description: "Description of application",
    shortcut: "⌥ G",
  },
  {
    icon: IconCompass,
    iconColor: IconColor.Security,
    group: GroupName.Security,
    name: "Discovery",
    description: "Description of application",
    shortcut: "⌥ D",
  },
  {
    icon: IconFileDescription,
    iconColor: IconColor.Security,
    group: GroupName.Security,
    name: "Policies",
    description: "Description of application",
    shortcut: "⌥ P",
  },
  {
    icon: IconCheckbox,
    iconColor: IconColor.Security,
    group: GroupName.Security,
    name: "Compliance",
    description: "Description of application",
    shortcut: "⌥ Q",
  },
  {
    icon: IconBrandAws,
    iconColor: IconColor.Store,
    group: GroupName.Store,
    name: "AWS",
    description: "Description of application",
    shortcut: "⌥ ↑ A",
  },
  {
    icon: IconDog,
    iconColor: IconColor.Store,
    group: GroupName.Store,
    name: "Datadog",
    description: "Description of application",
    shortcut: "⌥ ↑ D",
  },
  {
    icon: IconSquareLetterS,
    iconColor: IconColor.Store,
    group: GroupName.Store,
    name: "Splunk",
    description: "Description of application",
    shortcut: "⌥ ↑ S",
  },
  {
    icon: IconHexagonNumber3,
    iconColor: IconColor.Store,
    group: GroupName.Store,
    name: "S3",
    description: "Description of application",
    shortcut: "⌥ ↑ 3",
  },
  {
    icon: IconBrandGithub,
    iconColor: IconColor.Store,
    group: GroupName.Store,
    name: "Github",
    description: "Description of application",
    shortcut: "⌥ ↑ G",
  },
  {
    icon: IconTelescope,
    iconColor: IconColor.Store,
    group: GroupName.Store,
    name: "datahub",
    description: "Description of application",
    shortcut: "⌥ ↑ G",
  },
  {
    icon: IconPlus,
    iconColor: IconColor.Store,
    group: GroupName.Store,
    name: "Manage Store apps",
    description: "Description of application",
    shortcut: "⌥ ↑ G",
  },

  {
    icon: IconKey,
    iconColor: IconColor.Tools,
    group: GroupName.Tools,
    name: "API Keys",
    description: "Description of application",
    shortcut: "⌥ K",
  },
  {
    icon: IconSum,
    iconColor: IconColor.Tools,
    group: GroupName.Tools,
    name: "Sigma",
    description: "Description of application",
    shortcut: "⌥ S",
  },
  {
    icon: IconBinaryTree,
    iconColor: IconColor.Tools,
    group: GroupName.Tools,
    name: "Workflow",
    description: "Description of application",
    shortcut: "⌥ W",
  },

  {
    icon: IconSettingsBolt,
    iconColor: IconColor.Settings,
    group: GroupName.Settings,
    name: "Common Setting A",
    description: "Description of application",
    shortcut: "⌥ 0",
  },
  {
    icon: IconSettingsDollar,
    iconColor: IconColor.Settings,
    group: GroupName.Settings,
    name: "Special Setting B",
    description: "Description of application",
    shortcut: "⌥ 9",
  },
];
