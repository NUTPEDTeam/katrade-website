import React , { useState , useEffect } from 'react';
import { useForm } from '../../utils/useForm';
import Select from 'react-select';
import useAuthorization from '../../hooks/useAuthorization';

import Block from '../../components/Block';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import UploadImg from '../../components/Account/UploadImg';
import { SolidButton } from '../../components/standard/Button'
import useLoading from '../../hooks/useLoading';
import { IAccount, defaultEmptyAccount } from '../../interfaces/IUser';
import { ContactSupportOutlined } from '@material-ui/icons';

export default function AddItem() {

    const [ category , setCategory ] = useState<any>();
    const { getCategory , addItem } = useAuthorization();

    useEffect(() => {
        async function init() {
            var CategoryData = await getCategory();
            if (CategoryData) {
                setCategory(CategoryData);
            }
        }
        init();
    }, []);

    var MainCategoriesEn;
    var MainCategoriesTh;
    var SubCategoriesEn:any = [];
    var SubCategoriesTh:any = [];
    SubCategoriesEn.push([{ value: 'กรุณาเลือก Category หลักก่อน', label: 'กรุณาเลือก Category หลักก่อน'},]);
    SubCategoriesTh.push([{ value: 'กรุณาเลือก Category หลักก่อน', label: 'กรุณาเลือก Category หลักก่อน'},]);
    var indexCat = 0;
    if(category){
        MainCategoriesEn = category.map((data:any, index:any) => {
            indexCat++;
            var cCatEn = data.childCategoryEn
            SubCategoriesEn.push(cCatEn.map((data:any, index:any) => {
                return { value: data, 'label': data }
            }))
            var cCatTh = data.childCategoryTh
            SubCategoriesTh.push(cCatEn.map((data:any, index:any) => {
                return { value: data, 'label': data }
            }))
            var pCatEn = data.parentCategoryEn
            return { value: pCatEn, 'label': pCatEn, indexC: indexCat}
        });
        MainCategoriesTh = category.map((data:any, index:any) => {
            var pCatTh = data.childCategoryTh
            return { value: pCatTh, 'label': pCatTh, indexC: indexCat}
        });
    }

    // ------------------------------------------------------------------

    const [ finalMyMainCate , setFinalMyMainCate ] = useState();
    const [ finalMySubCate , setFinalMySubCate ] = useState();
    var mySubCateTag = "unSelect";
    var mySubCateIndex = 0;
    function findMySubCate() {
        var placeholderString = "กรุณาเลือก Category ย่อย ของ " + mySubCateTag;
        var godhelpme = SubCategoriesEn[mySubCateIndex];
        if(mySubCateIndex == 0){
            return <Select options={godhelpme} className="fs-5" name="mySubCate" placeholder="กรุณาเลือก Category หลักก่อน" />;
        }else{
            return <Select options={godhelpme} className="fs-5" name="mySubCate" onChange={(sel:any) => {setFinalMySubCate(sel.value)}} placeholder={placeholderString} />;
        }
    }
    function selectMySub(selectMySubCate:any) { 
        mySubCateTag = selectMySubCate.value;
        mySubCateIndex = selectMySubCate.indexC;
        setFinalMyMainCate(selectMySubCate.value);
        setMyItemSubCate(findMySubCate);
    }
    const [ myItemSubCate , setMyItemSubCate ] = useState(findMySubCate);

    // ------------------------------------------------------------------

    var wantSubCateTag = "unSelect";
    var wantSubCateIndex = 0;
    function findWantSubCate() {
        var placeholderString = "กรุณาเลือก Category ย่อย ของ " + wantSubCateTag;
        var godhelpme = SubCategoriesEn[wantSubCateIndex];
        if(wantSubCateIndex == 0){
            return <Select options={godhelpme} className="fs-5" name="wantSubCate" placeholder="กรุณาเลือก Category หลักก่อน" />;
        }else{
            return <Select options={godhelpme}  className="fs-5" name="wantSubCate" placeholder={placeholderString} />;
        }
    }
    function selectWantSub(selectWantSubCate:any) { 
        wantSubCateTag = selectWantSubCate.value;
        wantSubCateIndex = selectWantSubCate.indexC;
        setWantItemSubCate(findWantSubCate);
    }
    const [ wantItemSubCate , setWantItemSubCate ] = useState(findWantSubCate);
    const [account, setAccount] = useState<IAccount>(defaultEmptyAccount);
    const { getUserData } = useAuthorization();

    useEffect(() => {
        async function init() {
            const u = await getUserData();
            if (u) {
                setAccount(u);
            }
            else {
                alert("Can't get user data.");
            }
        }
        init();
    }, [])

    const [dataItem, handleDataItem] = useForm();

    function handleUnload(event:any){ 
        event.preventDefault();
            const data = {
            name: dataItem.name,
            detail: dataItem.myDetail,
            category: {
                parentCategoryEn: finalMyMainCate,
                parentCategoryTh: "",
                childCategoryEn: finalMySubCate,
                childCategoryTh: ""
            },
            pictures:[],
            require: [
                {
                    reqCat: {
                        parentCategoryEn: "",
                        parentCategoryTh: "",
                        childCategoryEn: "",
                        childCategoryTh: ""
                    },
                    detail: dataItem.wantDetail
                }
            ]
        }
        addItem(data);
    }

    return (
        <div>
            <Navbar image={account.profilePic}/>
            <Block height="auto" backgroundColor="#f7fafc">
                <form onSubmit={handleUnload}>
                    <div className="p-3 my-4 bg-white">
                        {/* ชื่อ */}
                        <h5 className="mb-4">Add New Item</h5>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label fs-5">Item Name</label>
                            <div className="col-md-10">
                                <input type="text" className="form-control fs-5" value={dataItem.name || ""} name="name" onChange={handleDataItem} placeholder="Enter your item name" />
                            </div>
                        </div>

                        {/* รูป */}
                        <div className="mb-4" style={{height:"auto",backgroundColor:"#C4C4C4",border:"2px dashed #000",borderRadius:"10px"}}>
                            <div className="px-3 py-4">
                                <p className="ms-2">Picture</p>
                                <div className="d-flex justify-content-around flex-wrap">
                                    <h4>รอปรับปรุง</h4>
                                    {/* <UploadImg positionPic={"Cover Picture"}/>
                                    <UploadImg positionPic={"Picture 1"}/>
                                    <UploadImg positionPic={"Picture 2"}/>
                                    <UploadImg positionPic={"Picture 3"}/>
                                    <UploadImg positionPic={"Picture 4"}/> */}
                                </div>
                            </div>
                        </div>

                        {/* ประเภทของเรา */}
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label fs-5">Category</label>
                            <div className="col-md-5">
                                <Select options={MainCategoriesEn} 
                                    className="fs-5" 
                                    name="category" 
                                    onChange={(selectSubCate) => {selectMySub(selectSubCate)}} 
                                    placeholder="กรุณาเลือก Category หลัก"/>
                            </div>
                            <div className="col-md-5">
                                {myItemSubCate}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label fs-5">Details</label>
                            <div className="col-md-10">
                                <textarea className="form-control fs-5" value={dataItem.myDetail || ""} name="myDetail" onChange={handleDataItem} rows={5} placeholder="Enter details."></textarea >
                            </div>
                        </div>

                        {/* ประเภทที่ต้องการ */}
                        <p className="mb-0 mt-4 fw-bold">Requirement</p>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label fs-5">Require Category</label>
                            <div className="col-md-5">
                                <Select options={MainCategoriesEn} className="fs-5" name="wantMainCate" onChange={(selectWantSubCate) => selectWantSub(selectWantSubCate)} placeholder="กรุณาเลือก Category หลัก"/>
                            </div>
                            <div className="col-md-5">
                                {wantItemSubCate}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label fs-5">Requirement Details</label>
                            <div className="col-md-10">
                                <textarea className="form-control fs-5" value={dataItem.wantDetail || ""} name="wantDetail" onChange={handleDataItem} rows={5} placeholder="Enter requirement details"></textarea>
                            </div>
                        </div>

                        {/* ปุ่มยืนยัน */}
                        <div className="d-flex justify-content-center mt-5">
                            <SolidButton width="100px" buttonColor="limegreen"><input type="submit" value="Submit" style={{backgroundColor:"transparent",color:"white"}}/></SolidButton>
                            <SolidButton width="100px" buttonColor="red"><a href="/app/manageInventory" style={{textDecoration:"none",color:"white"}}>Cancel</a></SolidButton>
                        </div>
                    </div>
                </form>
            </Block>
            <Footer />
        </div>
    );
}