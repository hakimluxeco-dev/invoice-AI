import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";

export default function InvoiceUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus("idle");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadStatus("idle");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("https://n8nmiat.miasolutions.qzz.io/webhook-test/invoice", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("success");
        toast({
          title: "Upload successful!",
          description: `${file.name} has been uploaded successfully.`,
        });
        setFile(null);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      setUploadStatus("error");
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8 bg-slate-950 min-h-screen">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Upload Invoice</h1>
          <p className="text-slate-400 text-lg">
            Upload your invoice documents from PC or mobile devices
          </p>
        </div>

        {/* Upload Card */}
        <div className="max-w-3xl">
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Invoice Upload</CardTitle>
              <CardDescription className="text-slate-400">
                Select an invoice file to upload to the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Drop Zone */}
              <div className="relative">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer bg-slate-800/50 hover:bg-slate-800 transition-all duration-300 hover:border-blue-500"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/50">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <p className="mb-2 text-lg font-semibold text-white">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-slate-400">
                      PDF, JPG, PNG, DOC (MAX. 10MB)
                    </p>
                  </div>
                </label>
              </div>

              {/* Selected File */}
              {file && (
                <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{file.name}</p>
                      <p className="text-xs text-slate-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFile(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    Remove
                  </Button>
                </div>
              )}

              {/* Upload Status */}
              {uploadStatus === "success" && (
                <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <p className="text-sm text-green-400">Invoice uploaded successfully!</p>
                </div>
              )}

              {uploadStatus === "error" && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <p className="text-sm text-red-400">Upload failed. Please try again.</p>
                </div>
              )}

              {/* Upload Button */}
              <Button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed h-12 text-base font-semibold"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Invoice
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info Cards */}
        <div className="grid gap-6 md:grid-cols-3 max-w-3xl">
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-white">Secure Upload</h3>
                <p className="text-sm text-slate-400">
                  Your files are encrypted and securely transmitted
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-white">Auto Processing</h3>
                <p className="text-sm text-slate-400">
                  Invoices are automatically processed via n8n
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-3">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-white">Multi-Device</h3>
                <p className="text-sm text-slate-400">
                  Upload from any device - PC, tablet, or mobile
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
