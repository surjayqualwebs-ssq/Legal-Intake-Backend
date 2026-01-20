export async function listCases() {
  return [
    { id: 1, title: "Property Dispute", status: "OPEN" },
    { id: 2, title: "Divorce Case", status: "IN_PROGRESS" }
  ];
}

export async function getCaseById(id) {
  return { id, title: "Property Dispute", status: "OPEN" };
}
