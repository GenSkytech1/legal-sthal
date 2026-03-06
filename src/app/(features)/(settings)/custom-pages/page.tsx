import CustomPagesList from "@/components/settings/custompages";

const CustomPagesPage = () => {
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Custom Pages</h4>
              <h6>Manage your custom landing pages</h6>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <CustomPagesList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPagesPage;
