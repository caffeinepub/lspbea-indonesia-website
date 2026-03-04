import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Time "mo:core/Time";
import List "mo:core/List";
import Text "mo:core/Text";

actor {
  include MixinStorage();

  type FileMetadata = {
    name : Text;
    size : Nat;
    uploadTime : Time.Time;
    blob : Storage.ExternalBlob;
  };

  let files = List.empty<FileMetadata>();

  public shared ({ caller }) func uploadFile(blob : Storage.ExternalBlob, name : Text, size : Nat) : async () {
    let file : FileMetadata = {
      name;
      size;
      uploadTime = Time.now();
      blob;
    };
    files.add(file);
  };

  public query ({ caller }) func getFiles() : async [FileMetadata] {
    files.toArray();
  };
};
