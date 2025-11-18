export function boxToTitle(box: string): string {
  switch (box) {
    case 'inbox':
      return 'Inbox';
    case 'sent':
      return 'Sent Items';
    case 'archived':
      return 'Archived Items';
    default:
      return 'Mailbox';
  }
}
