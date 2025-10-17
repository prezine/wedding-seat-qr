export type Invitee = {
  id: string;
  name: string;
  phone: string;
  seat_number: string;
  status: string;
  created_at: string;
  updated_at: string;
};

const STORAGE_KEY = "wedding_invitees";

export const storage = {
  getInvitees(): Invitee[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveInvitees(invitees: Invitee[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invitees));
  },

  addInvitee(
    invitee: Omit<Invitee, "id" | "created_at" | "updated_at">
  ): Invitee {
    const invitees = this.getInvitees();
    const newInvitee: Invitee = {
      ...invitee,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    invitees.push(newInvitee);
    this.saveInvitees(invitees);
    return newInvitee;
  },

  getInviteeById(id: string): Invitee | null {
    const invitees = this.getInvitees();
    return invitees.find((inv) => inv.id === id) || null;
  },

  deleteInvitee(id: string): void {
    const invitees = this.getInvitees();
    const filtered = invitees.filter((inv) => inv.id !== id);
    this.saveInvitees(filtered);
  },
};
