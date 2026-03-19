import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";



actor {
  include MixinStorage();

  type Education = {
    institution : Text;
    degree : Text;
    yearGraduated : Nat;
    certificate : ?Storage.ExternalBlob;
  };

  type WorkExperience = {
    company : Text;
    position : Text;
    durationInMonths : Nat;
    description : Text;
  };

  type Skill = {
    name : Text;
    level : Text;
  };

  type CertificationForm = {
    id : Text;
    name : Text;
    email : Text;
    education : [Education];
    workExperience : [WorkExperience];
    skills : [Skill];
    cv : ?Storage.ExternalBlob;
    portfolio : ?Storage.ExternalBlob;
    additionalFiles : [Storage.ExternalBlob];
    timestamp : Time.Time;
  };

  type CertificationFormInput = {
    name : Text;
    email : Text;
    education : [Education];
    workExperience : [WorkExperience];
    skills : [Skill];
    cv : ?Storage.ExternalBlob;
    portfolio : ?Storage.ExternalBlob;
    additionalFiles : [Storage.ExternalBlob];
  };

  let forms = List.empty<CertificationForm>();

  // Submit certification form.
  public shared ({ caller }) func submitForm(input : CertificationFormInput) : async Text {
    let id = "form-" # forms.size().toText();
    let form : CertificationForm = {
      id;
      name = input.name;
      email = input.email;
      education = input.education;
      workExperience = input.workExperience;
      skills = input.skills;
      cv = input.cv;
      portfolio = input.portfolio;
      additionalFiles = input.additionalFiles;
      timestamp = Time.now();
    };

    forms.add(form);
    id;
  };

  // Get all certification forms.
  public query ({ caller }) func getForms() : async [CertificationForm] {
    forms.toArray();
  };
};
