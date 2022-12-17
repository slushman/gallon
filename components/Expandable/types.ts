import React from 'react';

export interface ExpandableProps {
  children: React.ReactNode,
  labelClosed?: string,
  labelMain?: string,
  labelOpen?: string,
  startExpanded?: boolean,
}
