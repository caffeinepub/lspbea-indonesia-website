import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useMutation } from "@tanstack/react-query";
import {
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Loader2,
  Plus,
  Star,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";

let uid = 0;
function nextId() {
  uid += 1;
  return `id-${uid}`;
}

interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  yearGraduated: string;
  certificateFile?: File;
  certificateProgress?: number;
}

interface WorkExperienceEntry {
  id: string;
  company: string;
  position: string;
  durationInMonths: string;
  description: string;
}

interface SkillEntry {
  id: string;
  name: string;
  level: string;
}

const DEGREE_OPTIONS = [
  { value: "SMK", label: "SMK" },
  { value: "D3", label: "D3" },
  { value: "S1", label: "S1" },
  { value: "S2", label: "S2" },
  { value: "S3", label: "S3" },
  { value: "Lainnya", label: "Lainnya" },
];

const SKILL_LEVELS = [
  { value: "Pemula", label: "Pemula" },
  { value: "Menengah", label: "Menengah" },
  { value: "Mahir", label: "Mahir" },
];

const STEPS = [
  { id: "pribadi", label: "Data Pribadi", icon: User },
  { id: "pendidikan", label: "Pendidikan", icon: BookOpen },
  { id: "pengalaman", label: "Pengalaman Kerja", icon: Briefcase },
  { id: "skill", label: "Skill", icon: Star },
  { id: "dokumen", label: "Upload Dokumen", icon: FileText },
];

function FileUploadButton({
  accept,
  multiple,
  onFiles,
  children,
  dataOcid,
}: {
  accept: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  children: React.ReactNode;
  dataOcid?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        ref={ref}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          if (e.target.files) onFiles(Array.from(e.target.files));
          e.target.value = "";
        }}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => ref.current?.click()}
        data-ocid={dataOcid}
      >
        {children}
      </Button>
    </>
  );
}

export default function CertificationForm() {
  const { actor } = useActor();
  const [currentStep, setCurrentStep] = useState(0);

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");

  const [educations, setEducations] = useState<EducationEntry[]>([
    {
      id: nextId(),
      institution: "",
      degree: "",
      yearGraduated: "",
      certificateFile: undefined,
    },
  ]);

  const [workExperiences, setWorkExperiences] = useState<WorkExperienceEntry[]>(
    [
      {
        id: nextId(),
        company: "",
        position: "",
        durationInMonths: "",
        description: "",
      },
    ],
  );

  const [skills, setSkills] = useState<SkillEntry[]>([
    { id: nextId(), name: "", level: "" },
  ]);

  const [cvFile, setCvFile] = useState<File | undefined>();
  const [portfolioFiles, setPortfolioFiles] = useState<
    Array<{ id: string; file: File; progress: number }>
  >([]);
  const [cvProgress, setCvProgress] = useState(0);

  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor tidak tersedia");

      const educationData = await Promise.all(
        educations.map(async (edu, i) => {
          let certificate: ExternalBlob | undefined;
          if (edu.certificateFile) {
            const bytes = new Uint8Array(
              await edu.certificateFile.arrayBuffer(),
            );
            certificate = ExternalBlob.fromBytes(bytes).withUploadProgress(
              (p) => {
                setEducations((prev) =>
                  prev.map((e, idx) =>
                    idx === i ? { ...e, certificateProgress: p } : e,
                  ),
                );
              },
            );
          }
          return {
            institution: edu.institution,
            degree: edu.degree,
            yearGraduated: BigInt(edu.yearGraduated || "0"),
            certificate,
          };
        }),
      );

      let cv: ExternalBlob | undefined;
      if (cvFile) {
        const bytes = new Uint8Array(await cvFile.arrayBuffer());
        cv = ExternalBlob.fromBytes(bytes).withUploadProgress((p) =>
          setCvProgress(p),
        );
      }

      const additionalFiles: ExternalBlob[] = await Promise.all(
        portfolioFiles.map(async (pf, i) => {
          const bytes = new Uint8Array(await pf.file.arrayBuffer());
          return ExternalBlob.fromBytes(bytes).withUploadProgress((p) => {
            setPortfolioFiles((prev) =>
              prev.map((item, idx) =>
                idx === i ? { ...item, progress: p } : item,
              ),
            );
          });
        }),
      );

      await actor.submitForm({
        name: nama,
        email,
        education: educationData,
        workExperience: workExperiences.map((w) => ({
          company: w.company,
          position: w.position,
          durationInMonths: BigInt(w.durationInMonths || "0"),
          description: w.description,
        })),
        skills: skills.map((s) => ({ name: s.name, level: s.level })),
        cv,
        portfolio: undefined,
        additionalFiles,
      });
    },
    onSuccess: () => {
      setSubmitted(true);
      toast.success(
        "Formulir berhasil dikirim! Kami akan menghubungi Anda segera.",
      );
    },
    onError: (err) => {
      toast.error(`Gagal mengirim formulir: ${err.message}`);
    },
  });

  if (submitted) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Formulir Terkirim!
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Terima kasih, <strong>{nama}</strong>. Kami telah menerima
              formulir pendaftaran sertifikasi Anda. Tim LSPBEA Indonesia akan
              menghubungi Anda melalui email <strong>{email}</strong>.
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                setCurrentStep(0);
              }}
              variant="outline"
            >
              Isi Formulir Baru
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Sertifikasi Profesional
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Formulir Pendaftaran Sertifikasi
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Lengkapi formulir berikut untuk mendaftar sertifikasi LSPBEA
            Indonesia
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div
          className="flex items-center justify-between mb-8 overflow-x-auto pb-2"
          data-ocid="certification.section"
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isActive = i === currentStep;
            const isDone = i < currentStep;
            return (
              <div key={step.id} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(i)}
                  className={`flex flex-col items-center gap-1 px-2 transition-all ${
                    isActive
                      ? "text-primary"
                      : isDone
                        ? "text-primary/60"
                        : "text-muted-foreground"
                  }`}
                  data-ocid={`certification.step.${i + 1}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      isActive
                        ? "bg-primary border-primary text-primary-foreground"
                        : isDone
                          ? "bg-primary/20 border-primary/40 text-primary"
                          : "bg-background border-border text-muted-foreground"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className="text-xs font-medium whitespace-nowrap hidden sm:block">
                    {step.label}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 w-8 sm:w-16 mx-1 transition-all ${i < currentStep ? "bg-primary" : "bg-border"}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Form Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                {(() => {
                  const Icon = STEPS[currentStep].icon;
                  return <Icon className="w-5 h-5 text-primary" />;
                })()}
                {STEPS[currentStep].label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 0: Data Pribadi */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nama">Nama Lengkap</Label>
                    <Input
                      id="nama"
                      placeholder="Masukkan nama lengkap Anda"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      data-ocid="pribadi.nama_input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contoh@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      data-ocid="pribadi.email_input"
                    />
                  </div>
                </div>
              )}

              {/* Step 1: Pendidikan */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {educations.map((edu, i) => (
                    <div
                      key={edu.id}
                      className="space-y-4 p-4 border border-border rounded-lg bg-muted/20"
                      data-ocid={`pendidikan.item.${i + 1}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-muted-foreground">
                          Pendidikan {i + 1}
                        </span>
                        {educations.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setEducations((prev) =>
                                prev.filter((e) => e.id !== edu.id),
                              )
                            }
                            className="text-destructive hover:text-destructive"
                            data-ocid={`pendidikan.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nama Institusi</Label>
                          <Input
                            placeholder="Universitas / Sekolah"
                            value={edu.institution}
                            onChange={(e) =>
                              setEducations((prev) =>
                                prev.map((item) =>
                                  item.id === edu.id
                                    ? { ...item, institution: e.target.value }
                                    : item,
                                ),
                              )
                            }
                            data-ocid={`pendidikan.input.${i + 1}`}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Jenjang Pendidikan</Label>
                          <Select
                            value={edu.degree}
                            onValueChange={(v) =>
                              setEducations((prev) =>
                                prev.map((item) =>
                                  item.id === edu.id
                                    ? { ...item, degree: v }
                                    : item,
                                ),
                              )
                            }
                          >
                            <SelectTrigger
                              data-ocid={`pendidikan.select.${i + 1}`}
                            >
                              <SelectValue placeholder="Pilih jenjang" />
                            </SelectTrigger>
                            <SelectContent>
                              {DEGREE_OPTIONS.map((d) => (
                                <SelectItem key={d.value} value={d.value}>
                                  {d.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Tahun Lulus</Label>
                          <Input
                            type="number"
                            placeholder="2020"
                            value={edu.yearGraduated}
                            onChange={(e) =>
                              setEducations((prev) =>
                                prev.map((item) =>
                                  item.id === edu.id
                                    ? { ...item, yearGraduated: e.target.value }
                                    : item,
                                ),
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Sertifikat Pendidikan</Label>
                          <div className="flex items-center gap-2">
                            <FileUploadButton
                              accept=".pdf,.jpg,.jpeg,.png"
                              onFiles={(files) =>
                                setEducations((prev) =>
                                  prev.map((item) =>
                                    item.id === edu.id
                                      ? {
                                          ...item,
                                          certificateFile: files[0],
                                          certificateProgress: 0,
                                        }
                                      : item,
                                  ),
                                )
                              }
                              dataOcid={`pendidikan.upload_button.${i + 1}`}
                            >
                              <Upload className="w-4 h-4 mr-1" />
                              Unggah
                            </FileUploadButton>
                            {edu.certificateFile && (
                              <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                                {edu.certificateFile.name}
                              </span>
                            )}
                          </div>
                          {edu.certificateProgress !== undefined &&
                            edu.certificateProgress > 0 &&
                            edu.certificateProgress < 100 && (
                              <Progress
                                value={edu.certificateProgress}
                                className="h-1"
                              />
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setEducations((prev) => [
                        ...prev,
                        {
                          id: nextId(),
                          institution: "",
                          degree: "",
                          yearGraduated: "",
                          certificateFile: undefined,
                        },
                      ])
                    }
                    className="w-full border-dashed"
                    data-ocid="pendidikan.add_button"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Tambah Pendidikan
                  </Button>
                </div>
              )}

              {/* Step 2: Pengalaman Kerja */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  {workExperiences.map((work, i) => (
                    <div
                      key={work.id}
                      className="space-y-4 p-4 border border-border rounded-lg bg-muted/20"
                      data-ocid={`pengalaman.item.${i + 1}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-muted-foreground">
                          Pengalaman {i + 1}
                        </span>
                        {workExperiences.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setWorkExperiences((prev) =>
                                prev.filter((w) => w.id !== work.id),
                              )
                            }
                            className="text-destructive hover:text-destructive"
                            data-ocid={`pengalaman.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nama Perusahaan</Label>
                          <Input
                            placeholder="PT. Nama Perusahaan"
                            value={work.company}
                            onChange={(e) =>
                              setWorkExperiences((prev) =>
                                prev.map((item) =>
                                  item.id === work.id
                                    ? { ...item, company: e.target.value }
                                    : item,
                                ),
                              )
                            }
                            data-ocid={`pengalaman.input.${i + 1}`}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Posisi / Jabatan</Label>
                          <Input
                            placeholder="Manager Teknik"
                            value={work.position}
                            onChange={(e) =>
                              setWorkExperiences((prev) =>
                                prev.map((item) =>
                                  item.id === work.id
                                    ? { ...item, position: e.target.value }
                                    : item,
                                ),
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Lama Bekerja (bulan)</Label>
                          <Input
                            type="number"
                            placeholder="24"
                            value={work.durationInMonths}
                            onChange={(e) =>
                              setWorkExperiences((prev) =>
                                prev.map((item) =>
                                  item.id === work.id
                                    ? {
                                        ...item,
                                        durationInMonths: e.target.value,
                                      }
                                    : item,
                                ),
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Deskripsi Pekerjaan</Label>
                        <Textarea
                          placeholder="Jelaskan tugas dan tanggung jawab Anda..."
                          value={work.description}
                          onChange={(e) =>
                            setWorkExperiences((prev) =>
                              prev.map((item) =>
                                item.id === work.id
                                  ? { ...item, description: e.target.value }
                                  : item,
                              ),
                            )
                          }
                          rows={3}
                          data-ocid={`pengalaman.textarea.${i + 1}`}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setWorkExperiences((prev) => [
                        ...prev,
                        {
                          id: nextId(),
                          company: "",
                          position: "",
                          durationInMonths: "",
                          description: "",
                        },
                      ])
                    }
                    className="w-full border-dashed"
                    data-ocid="pengalaman.add_button"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Tambah Pengalaman Kerja
                  </Button>
                </div>
              )}

              {/* Step 3: Skill */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  {skills.map((skill, i) => (
                    <div
                      key={skill.id}
                      className="flex items-center gap-3"
                      data-ocid={`skill.item.${i + 1}`}
                    >
                      <div className="flex-1">
                        <Input
                          placeholder="Nama skill (misal: AutoCAD, Revit...)"
                          value={skill.name}
                          onChange={(e) =>
                            setSkills((prev) =>
                              prev.map((item) =>
                                item.id === skill.id
                                  ? { ...item, name: e.target.value }
                                  : item,
                              ),
                            )
                          }
                          data-ocid={`skill.input.${i + 1}`}
                        />
                      </div>
                      <div className="w-36">
                        <Select
                          value={skill.level}
                          onValueChange={(v) =>
                            setSkills((prev) =>
                              prev.map((item) =>
                                item.id === skill.id
                                  ? { ...item, level: v }
                                  : item,
                              ),
                            )
                          }
                        >
                          <SelectTrigger data-ocid={`skill.select.${i + 1}`}>
                            <SelectValue placeholder="Level" />
                          </SelectTrigger>
                          <SelectContent>
                            {SKILL_LEVELS.map((l) => (
                              <SelectItem key={l.value} value={l.value}>
                                {l.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {skills.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setSkills((prev) =>
                              prev.filter((s) => s.id !== skill.id),
                            )
                          }
                          className="text-destructive hover:text-destructive shrink-0"
                          data-ocid={`skill.delete_button.${i + 1}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setSkills((prev) => [
                        ...prev,
                        { id: nextId(), name: "", level: "" },
                      ])
                    }
                    className="w-full border-dashed"
                    data-ocid="skill.add_button"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Tambah Skill
                  </Button>
                </div>
              )}

              {/* Step 4: Upload Dokumen */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  {/* CV Upload */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Upload CV</Label>
                    <p className="text-sm text-muted-foreground">
                      Format PDF, maksimal 1 file
                    </p>
                    <div
                      className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors"
                      data-ocid="dokumen.cv_dropzone"
                    >
                      {cvFile ? (
                        <div className="space-y-2">
                          <FileText className="w-8 h-8 text-primary mx-auto" />
                          <p className="text-sm font-medium">{cvFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          {cvProgress > 0 && cvProgress < 100 && (
                            <Progress
                              value={cvProgress}
                              className="h-1 max-w-xs mx-auto"
                            />
                          )}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setCvFile(undefined);
                              setCvProgress(0);
                            }}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-1" /> Hapus
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Upload className="w-10 h-10 text-muted-foreground mx-auto" />
                          <p className="text-sm text-muted-foreground">
                            Seret file ke sini atau klik untuk memilih
                          </p>
                          <FileUploadButton
                            accept=".pdf"
                            onFiles={(files) => {
                              setCvFile(files[0]);
                              setCvProgress(0);
                            }}
                            dataOcid="dokumen.cv_upload_button"
                          >
                            <Upload className="w-4 h-4 mr-2" /> Pilih CV
                          </FileUploadButton>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Portfolio Upload */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">
                      Upload Project / Portfolio
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Format PDF atau gambar, bisa lebih dari satu file
                    </p>
                    <div
                      className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors"
                      data-ocid="dokumen.portfolio_dropzone"
                    >
                      {portfolioFiles.length > 0 ? (
                        <div className="space-y-2">
                          {portfolioFiles.map((pf, i) => (
                            <div
                              key={pf.id}
                              className="flex items-center justify-between p-2 bg-muted/40 rounded-lg"
                            >
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-primary shrink-0" />
                                <span className="text-sm truncate max-w-[200px]">
                                  {pf.file.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {(pf.file.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                              </div>
                              {pf.progress > 0 && pf.progress < 100 && (
                                <Progress
                                  value={pf.progress}
                                  className="h-1 w-20"
                                />
                              )}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-destructive shrink-0"
                                onClick={() =>
                                  setPortfolioFiles((prev) =>
                                    prev.filter((_, idx) => idx !== i),
                                  )
                                }
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                          <FileUploadButton
                            accept=".pdf,.jpg,.jpeg,.png"
                            multiple
                            onFiles={(files) =>
                              setPortfolioFiles((prev) => [
                                ...prev,
                                ...files.map((f) => ({
                                  id: nextId(),
                                  file: f,
                                  progress: 0,
                                })),
                              ])
                            }
                            dataOcid="dokumen.portfolio_upload_button"
                          >
                            <Plus className="w-4 h-4 mr-1" /> Tambah File
                          </FileUploadButton>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Upload className="w-10 h-10 text-muted-foreground mx-auto" />
                          <p className="text-sm text-muted-foreground">
                            Unggah sertifikat project atau portfolio Anda
                          </p>
                          <FileUploadButton
                            accept=".pdf,.jpg,.jpeg,.png"
                            multiple
                            onFiles={(files) =>
                              setPortfolioFiles(
                                files.map((f) => ({
                                  id: nextId(),
                                  file: f,
                                  progress: 0,
                                })),
                              )
                            }
                            dataOcid="dokumen.portfolio_upload_button"
                          >
                            <Upload className="w-4 h-4 mr-2" /> Pilih File
                          </FileUploadButton>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={currentStep === 0}
            data-ocid="certification.prev_button"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Sebelumnya
          </Button>

          {currentStep < STEPS.length - 1 ? (
            <Button
              type="button"
              onClick={() =>
                setCurrentStep((s) => Math.min(STEPS.length - 1, s + 1))
              }
              data-ocid="certification.next_button"
            >
              Selanjutnya <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
              className="bg-primary hover:bg-primary/90"
              data-ocid="certification.submit_button"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Mengirim...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Kirim Formulir
                  Sertifikasi
                </>
              )}
            </Button>
          )}
        </div>

        {mutation.isPending && (
          <div className="mt-4" data-ocid="certification.loading_state">
            <p className="text-sm text-center text-muted-foreground mb-2">
              Mengunggah dokumen dan mengirim formulir...
            </p>
            <Progress value={undefined} className="h-1 animate-pulse" />
          </div>
        )}
      </div>
    </section>
  );
}
