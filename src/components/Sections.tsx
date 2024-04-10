import { FC } from "react";
import {
  IconAlertTriangle,
  IconBinaryTree,
  IconBrandAws,
  IconBrandGithub,
  IconBuildingWarehouse,
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

export interface Group {
  icon: FC;
  name: GroupName;
}

export interface Section {
  icon: FC;
  group: GroupName;
  name: string;
  description: string;
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
    group: GroupName.Data,
    name: "Catalog",
    description: "Description of application",
  },
  {
    icon: IconEye,
    group: GroupName.Data,
    name: "Observability",
    description: "Description of application",
  },
  {
    icon: IconTournament,
    group: GroupName.Data,
    name: "Lineage",
    description: "Description of application",
  },
  {
    icon: IconSwitch3,
    group: GroupName.Data,
    name: "ETL",
    description: "Description of application",
  },

  {
    icon: IconUserCheck,
    group: GroupName.Security,
    name: "Access",
    description: "Description of application",
  },
  {
    icon: IconAlertTriangle,
    group: GroupName.Security,
    name: "Logs",
    description: "Description of application",
  },
  {
    icon: IconCompass,
    group: GroupName.Security,
    name: "Discovery",
    description: "Description of application",
  },
  {
    icon: IconFileDescription,
    group: GroupName.Security,
    name: "Policies",
    description: "Description of application",
  },

  {
    icon: IconBrandAws,
    group: GroupName.Store,
    name: "AWS",
    description: "Description of application",
  },
  {
    icon: IconDog,
    group: GroupName.Store,
    name: "Datadog",
    description: "Description of application",
  },
  {
    icon: IconSquareLetterS,
    group: GroupName.Store,
    name: "Splunk",
    description: "Description of application",
  },
  {
    icon: IconHexagonNumber3,
    group: GroupName.Store,
    name: "S3",
    description: "Description of application",
  },
  {
    icon: IconBrandGithub,
    group: GroupName.Store,
    name: "Github",
    description: "Description of application",
  },
  {
    icon: IconTelescope,
    group: GroupName.Store,
    name: "datahub",
    description: "Description of application",
  },
  {
    icon: IconPlus,
    group: GroupName.Store,
    name: "Manage Store apps",
    description: "Description of application",
  },

  {
    icon: IconKey,
    group: GroupName.Tools,
    name: "API Keys",
    description: "Description of application",
  },
  {
    icon: IconSum,
    group: GroupName.Tools,
    name: "Sigma",
    description: "Description of application",
  },
  {
    icon: IconBinaryTree,
    group: GroupName.Tools,
    name: "Workflow",
    description: "Description of application",
  },

  {
    icon: IconSettingsBolt,
    group: GroupName.Settings,
    name: "Common Setting A",
    description: "Description of application",
  },
  {
    icon: IconSettingsDollar,
    group: GroupName.Settings,
    name: "Special Setting B",
    description: "Description of application",
  },
];
