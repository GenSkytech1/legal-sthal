import CustomPageForm from "@/components/settings/custompages/form";

const CreateCustomPage = () => {
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Create Page</h4>
              <h6>Add a new custom landing page</h6>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <CustomPageForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomPage;
