import type { CertificationForm } from "@/backend";
import type { ExternalBlob } from "@/backend";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";
import type { UserData } from "@/context/AuthContext";
import { useActor } from "@/hooks/useActor";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  FileText,
  Loader2,
  LogOut,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

type SortOrder = "newest" | "oldest" | "name-az";

function useCertificationForms() {
  const { actor, isFetching } = useActor();
  return useQuery<CertificationForm[]>({
    queryKey: ["certificationForms"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getForms();
    },
    enabled: !!actor && !isFetching,
  });
}

function formatDate(timestamp: bigint): string {
  return new Date(Number(timestamp / 1_000_000n)).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type MergedRow = {
  index: number;
  user: UserData;
  form: CertificationForm | null;
};

function buildPrintHTML(rows: MergedRow[], title: string): string {
  const style = `
    <style>
      body { font-family: Arial, sans-serif; font-size: 12px; color: #111; margin: 0; padding: 20px; }
      h1 { color: #1e40af; font-size: 18px; margin-bottom: 4px; }
      .meta { color: #555; font-size: 11px; margin-bottom: 24px; }
      .user-block { page-break-inside: avoid; margin-bottom: 32px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; }
      .user-block h2 { color: #1e40af; font-size: 15px; margin: 0 0 4px; }
      .user-block .info { color: #555; font-size: 11px; margin-bottom: 12px; }
      .section-title { font-weight: bold; font-size: 12px; margin: 12px 0 4px; color: #1e40af; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
      th { background: #1e40af; color: white; padding: 5px 8px; text-align: left; font-size: 11px; }
      td { padding: 4px 8px; border-bottom: 1px solid #e2e8f0; font-size: 11px; }
      .no-doc { color: #aaa; font-style: italic; font-size: 11px; }
      @media print { body { padding: 0; } }
    </style>
  `;

  const blocks = rows
    .map(
      (row) => `
    <div class="user-block">
      <h2>${row.index}. ${row.user.firstName} ${row.user.lastName}</h2>
      <div class="info">
        Nama Akun: ${row.user.username} &nbsp;|&nbsp;
        Gmail: ${row.user.email} &nbsp;|&nbsp;
        Tanggal Daftar: ${new Date(row.user.registeredAt).toLocaleDateString("id-ID")}
      </div>

      ${
        row.form
          ? `
        <div class="section-title">Pendidikan</div>
        <table>
          <thead><tr><th>Institusi</th><th>Gelar</th><th>Tahun Lulus</th><th>Sertifikat</th></tr></thead>
          <tbody>${row.form.education.map((e) => `<tr><td>${e.institution}</td><td>${e.degree}</td><td>${String(e.yearGraduated)}</td><td>${e.certificate ? `<a href='${e.certificate.getDirectURL()}'>Lihat File</a>` : "-"}</td></tr>`).join("") || "<tr><td colspan=4>-</td></tr>"}</tbody>
        </table>

        <div class="section-title">Pengalaman Kerja</div>
        <table>
          <thead><tr><th>Perusahaan</th><th>Posisi</th><th>Durasi (bln)</th><th>Deskripsi</th></tr></thead>
          <tbody>${row.form.workExperience.map((w) => `<tr><td>${w.company}</td><td>${w.position}</td><td>${String(w.durationInMonths)}</td><td>${w.description}</td></tr>`).join("") || "<tr><td colspan=4>-</td></tr>"}</tbody>
        </table>

        <div class="section-title">Skill</div>
        <table>
          <thead><tr><th>Nama Skill</th><th>Level</th></tr></thead>
          <tbody>${row.form.skills.map((s) => `<tr><td>${s.name}</td><td>${s.level}</td></tr>`).join("") || "<tr><td colspan=2>-</td></tr>"}</tbody>
        </table>

        <div class="section-title">Dokumen Diunggah</div>
        <table>
          <thead><tr><th>Jenis Dokumen</th><th>Link</th></tr></thead>
          <tbody>
            ${row.form.cv ? `<tr><td>CV</td><td><a href="${row.form.cv.getDirectURL()}">Unduh CV</a></td></tr>` : ""}
            ${row.form.portfolio ? `<tr><td>Portfolio</td><td><a href="${row.form.portfolio.getDirectURL()}">Unduh Portfolio</a></td></tr>` : ""}
            ${row.form.additionalFiles.map((f, i) => `<tr><td>File Tambahan ${i + 1}</td><td><a href="${f.getDirectURL()}">Unduh File ${i + 1}</a></td></tr>`).join("")}
            ${!row.form.cv && !row.form.portfolio && row.form.additionalFiles.length === 0 ? "<tr><td colspan=2>Tidak ada dokumen diunggah</td></tr>" : ""}
          </tbody>
        </table>

        <div class="info">Tanggal Kirim Sertifikasi: ${formatDate(row.form.timestamp)}</div>
        `
          : `<p class="no-doc">Belum ada dokumen sertifikasi yang dikirim.</p>`
      }
    </div>
  `,
    )
    .join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title>${style}</head><body>
    <h1>${title}</h1>
    <div class="meta">Diekspor pada: ${new Date().toLocaleString("id-ID")} &nbsp;|&nbsp; Total: ${rows.length} pengguna</div>
    ${blocks}
    <script>window.onload=function(){window.print();}<\/script>
  </body></html>`;
}

function printRows(rows: MergedRow[], title: string) {
  const html = buildPrintHTML(rows, title);
  const win = window.open("", "_blank");
  if (win) {
    win.document.write(html);
    win.document.close();
  }
}

function DocumentList({ form }: { form: CertificationForm }) {
  const docs: { label: string; blob: ExternalBlob }[] = [];

  if (form.cv) docs.push({ label: "CV", blob: form.cv });
  if (form.portfolio) docs.push({ label: "Portfolio", blob: form.portfolio });
  form.education.forEach((edu, i) => {
    if (edu.certificate)
      docs.push({
        label: `Sertifikat Pendidikan ${i + 1}${edu.institution ? ` - ${edu.institution}` : ""}`,
        blob: edu.certificate,
      });
  });
  form.additionalFiles.forEach((f, i) => {
    docs.push({ label: `File Tambahan ${i + 1}`, blob: f });
  });

  if (docs.length === 0)
    return (
      <span className="text-xs text-muted-foreground italic">
        Tidak ada file diunggah
      </span>
    );

  return (
    <div className="flex flex-col gap-1">
      {docs.map((doc) => (
        <a
          key={doc.label}
          href={doc.blob.getDirectURL()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline"
        >
          <FileText className="h-3 w-3 shrink-0" />
          {doc.label}
        </a>
      ))}
    </div>
  );
}

type DocItem = { label: string; blob: ExternalBlob };

function buildDocSections(form: CertificationForm): {
  cv: DocItem[];
  portfolio: DocItem[];
  sertifikat: DocItem[];
  tambahan: DocItem[];
} {
  const cv: DocItem[] = [];
  const portfolio: DocItem[] = [];
  const sertifikat: DocItem[] = [];
  const tambahan: DocItem[] = [];

  if (form.cv) cv.push({ label: "CV", blob: form.cv });
  if (form.portfolio)
    portfolio.push({ label: "Portfolio", blob: form.portfolio });
  form.education.forEach((edu, i) => {
    if (edu.certificate)
      sertifikat.push({
        label: `Sertifikat Pendidikan ${i + 1}${edu.institution ? ` - ${edu.institution}` : ""}`,
        blob: edu.certificate,
      });
  });
  form.additionalFiles.forEach((f, i) => {
    tambahan.push({ label: `File Tambahan ${i + 1}`, blob: f });
  });

  return { cv, portfolio, sertifikat, tambahan };
}

function DocSectionGroup({
  title,
  items,
}: { title: string; items: DocItem[] }) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-primary">{title}</h4>
      <div className="space-y-1.5">
        {items.map((doc) => (
          <div
            key={doc.label}
            className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2"
          >
            <div className="flex items-center gap-2 min-w-0">
              <FileText className="h-4 w-4 text-blue-500 shrink-0" />
              <span className="text-sm text-foreground truncate">
                {doc.label}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href={doc.blob.getDirectURL()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-2 text-xs gap-1"
                >
                  <Eye className="h-3 w-3" />
                  Buka
                </Button>
              </a>
              <a href={doc.blob.getDirectURL()} download>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-7 px-2 text-xs gap-1"
                >
                  <Download className="h-3 w-3" />
                  Unduh
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { currentUser, isAdmin, logout, getAllUsers } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserData[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [docDialogRow, setDocDialogRow] = useState<MergedRow | null>(null);

  const { data: forms = [], isLoading: formsLoading } = useCertificationForms();

  useEffect(() => {
    if (!currentUser || !isAdmin) {
      navigate({ to: "/login" });
      return;
    }
    const allUsers = getAllUsers().filter((u) => u.role !== "admin");
    const sorted = [...allUsers].sort((a, b) => {
      if (sortOrder === "newest")
        return (
          new Date(b.registeredAt).getTime() -
          new Date(a.registeredAt).getTime()
        );
      if (sortOrder === "oldest")
        return (
          new Date(a.registeredAt).getTime() -
          new Date(b.registeredAt).getTime()
        );
      return a.firstName.localeCompare(b.firstName);
    });
    setUsers(sorted);
  }, [currentUser, isAdmin, navigate, getAllUsers, sortOrder]);

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  const toggleExpand = (username: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(username)) next.delete(username);
      else next.add(username);
      return next;
    });
  };

  const mergedRows: MergedRow[] = users.map((user, i) => ({
    index: i + 1,
    user,
    form: forms.find((f) => f.email === user.email) ?? null,
  }));

  if (!currentUser || !isAdmin) return null;

  const totalDocs = forms.reduce((acc, f) => {
    let count = 0;
    if (f.cv) count++;
    if (f.portfolio) count++;
    count += f.additionalFiles.length;
    count += f.education.filter((e) => e.certificate).length;
    return acc + count;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/lspbea-building-logo-transparent.dim_200x200.png"
              alt="LSPBEA"
              className="h-10 w-10 object-contain"
            />
            <div>
              <h1 className="text-lg font-bold">Panel Admin</h1>
              <p className="text-xs opacity-80">LSPBEA Indonesia</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm hidden sm:block">
              Halo, {currentUser.firstName} {currentUser.lastName}
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleLogout}
              data-ocid="admin.button"
            >
              <LogOut className="mr-1.5 h-4 w-4" />
              Keluar
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-4">
            <div className="bg-primary/10 rounded-lg p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Pengguna</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-4">
            <div className="bg-green-500/10 rounded-lg p-3">
              <Users className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kapasitas Tersisa</p>
              <p className="text-2xl font-bold">{100 - users.length}</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-4">
            <div className="bg-blue-500/10 rounded-lg p-3">
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Formulir Sertifikasi
              </p>
              <p className="text-2xl font-bold">{forms.length}</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-4">
            <div className="bg-orange-500/10 rounded-lg p-3">
              <Download className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Total File Diunggah
              </p>
              <p className="text-2xl font-bold">{totalDocs}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 border-b border-border">
            <div>
              <h2 className="text-lg font-semibold">Data Pengguna Terdaftar</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Data akun, dokumen sertifikasi, dan semua file yang diunggah
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Select
                value={sortOrder}
                onValueChange={(v) => setSortOrder(v as SortOrder)}
              >
                <SelectTrigger className="w-36" data-ocid="admin.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Terbaru</SelectItem>
                  <SelectItem value="oldest">Terlama</SelectItem>
                  <SelectItem value="name-az">Nama A-Z</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() =>
                  printRows(mergedRows, "Data Pengguna LSPBEA Indonesia")
                }
                disabled={mergedRows.length === 0}
                data-ocid="admin.primary_button"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Unduh Semua PDF
              </Button>
            </div>
          </div>

          {formsLoading ? (
            <div
              data-ocid="admin.loading_state"
              className="flex items-center justify-center py-16 text-muted-foreground gap-3"
            >
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Memuat data...</span>
            </div>
          ) : users.length === 0 ? (
            <div
              data-ocid="admin.empty_state"
              className="text-center py-16 text-muted-foreground"
            >
              <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>Belum ada pengguna terdaftar</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-ocid="admin.table">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">No</TableHead>
                    <TableHead>Nama Akun</TableHead>
                    <TableHead>Nama Lengkap</TableHead>
                    <TableHead>Gmail</TableHead>
                    <TableHead>Tanggal Daftar</TableHead>
                    <TableHead>Pendidikan</TableHead>
                    <TableHead>Pengalaman</TableHead>
                    <TableHead>Skill</TableHead>
                    <TableHead>Dokumen Diunggah</TableHead>
                    <TableHead>Tgl Kirim Dok.</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mergedRows.map((row) => {
                    const isExpanded = expandedRows.has(row.user.username);
                    return (
                      <>
                        <TableRow
                          key={row.user.username}
                          data-ocid={`admin.item.${row.index}`}
                          className="hover:bg-muted/40 cursor-pointer"
                          onClick={() => toggleExpand(row.user.username)}
                        >
                          <TableCell className="font-medium">
                            {row.index}
                          </TableCell>
                          <TableCell>{row.user.username}</TableCell>
                          <TableCell>
                            {row.user.firstName} {row.user.lastName}
                          </TableCell>
                          <TableCell>{row.user.email}</TableCell>
                          <TableCell>
                            {new Date(row.user.registeredAt).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </TableCell>
                          {row.form ? (
                            <>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5">
                                  {row.form.education.length} entri
                                </span>
                              </TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5">
                                  {row.form.workExperience.length} entri
                                </span>
                              </TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-0.5">
                                  {row.form.skills.length} skill
                                </span>
                              </TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-0.5">
                                  {(row.form.cv ? 1 : 0) +
                                    (row.form.portfolio ? 1 : 0) +
                                    row.form.additionalFiles.length +
                                    row.form.education.filter(
                                      (e) => e.certificate,
                                    ).length}{" "}
                                  file
                                </span>
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground">
                                {new Date(
                                  Number(row.form.timestamp / 1_000_000n),
                                ).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </TableCell>
                            </>
                          ) : (
                            <TableCell
                              colSpan={5}
                              className="text-xs text-muted-foreground italic"
                            >
                              Belum ada dokumen sertifikasi
                            </TableCell>
                          )}
                          <TableCell
                            className="text-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-center gap-1">
                              {row.form && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDocDialogRow(row);
                                  }}
                                  data-ocid={`admin.open_modal_button.${row.index}`}
                                  className="flex items-center gap-1.5 text-blue-600 border-blue-200 hover:bg-blue-50"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                  Lihat Dokumen
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  printRows(
                                    [row],
                                    `Data ${row.user.firstName} ${row.user.lastName}`,
                                  )
                                }
                                data-ocid={`admin.button.${row.index}`}
                                className="flex items-center gap-1.5"
                              >
                                <Download className="h-3.5 w-3.5" />
                                PDF
                              </Button>
                              {row.form && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    toggleExpand(row.user.username)
                                  }
                                  className="flex items-center gap-1"
                                >
                                  {isExpanded ? (
                                    <ChevronUp className="h-3.5 w-3.5" />
                                  ) : (
                                    <ChevronDown className="h-3.5 w-3.5" />
                                  )}
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>

                        {isExpanded && row.form && (
                          <TableRow
                            key={`${row.user.username}-expanded`}
                            className="bg-muted/20"
                          >
                            <TableCell colSpan={11} className="py-4 px-6">
                              <div className="space-y-3">
                                <p className="text-sm font-semibold text-foreground mb-2">
                                  Semua Dokumen Diunggah oleh{" "}
                                  {row.user.firstName} {row.user.lastName}
                                </p>
                                <DocumentList form={row.form} />
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          &copy; {new Date().getFullYear()} LSPBEA Indonesia. Panel Admin.
        </p>
      </main>

      {/* Document Viewer Dialog */}
      <Dialog
        open={docDialogRow !== null}
        onOpenChange={(open) => {
          if (!open) setDocDialogRow(null);
        }}
      >
        <DialogContent
          className="max-w-lg max-h-[80vh] overflow-y-auto"
          data-ocid="admin.dialog"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Dokumen — {docDialogRow?.user.firstName}{" "}
              {docDialogRow?.user.lastName}
            </DialogTitle>
          </DialogHeader>

          {docDialogRow?.form ? (
            (() => {
              const sections = buildDocSections(docDialogRow.form);
              const hasAny =
                sections.cv.length +
                  sections.portfolio.length +
                  sections.sertifikat.length +
                  sections.tambahan.length >
                0;
              return hasAny ? (
                <div className="space-y-5 mt-2">
                  <DocSectionGroup title="CV" items={sections.cv} />
                  <DocSectionGroup
                    title="Portfolio"
                    items={sections.portfolio}
                  />
                  <DocSectionGroup
                    title="Sertifikat Pendidikan"
                    items={sections.sertifikat}
                  />
                  <DocSectionGroup
                    title="File Tambahan"
                    items={sections.tambahan}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-muted-foreground gap-3">
                  <FileText className="h-10 w-10 opacity-30" />
                  <p className="text-sm">Tidak ada dokumen diunggah</p>
                </div>
              );
            })()
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground gap-3">
              <FileText className="h-10 w-10 opacity-30" />
              <p className="text-sm">Tidak ada dokumen diunggah</p>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <Button
              variant="outline"
              onClick={() => setDocDialogRow(null)}
              data-ocid="admin.close_button"
            >
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
