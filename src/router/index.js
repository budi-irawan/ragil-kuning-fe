import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/auth/Login.vue'
import DashboardView from '../views/DashboardView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user/ListUserView')
  },
  {
    path: '/user/register',
    name: 'register-user',
    component: () => import('../views/user/FormTambahUserView')
  },
  {
    path: '/master/wilayah',
    name: 'Wilayah',
    component: () => import('../views/master/wilayah/ListWilayahView')
  },
  {
    path: '/master/wilayah/tambah',
    name: 'TambahWilayah',
    component: () => import('../views/master/wilayah/FormTambahWilayahView')
  },
  {
    path: '/master/wilayah/edit',
    name: 'EditWilayah',
    component: () => import('../views/master/wilayah/FormEditWilayahView')
  },
  {
    path: '/master/desa',
    name: 'desa',
    component: () => import('../views/master/desa/ListDesaView')
  },
  {
    path: '/master/desa/tambah',
    name: 'tambah-desa',
    component: () => import('../views/master/desa/FormTambahDesaView')
  },
  {
    path: '/master/desa/edit',
    name: 'edit-desa',
    component: () => import('../views/master/desa/FormEditDesaView')
  },
  {
    path: '/master/dusun',
    name: 'dusun',
    component: () => import('../views/master/dusun/ListDusunView')
  },
  {
    path: '/master/dusun/tambah',
    name: 'tambah-dusun',
    component: () => import('../views/master/dusun/FormTambahDusunView')
  },
  {
    path: '/master/dusun/edit',
    name: 'edit-dusun',
    component: () => import('../views/master/dusun/FormEditDusunView')
  },
  {
    path: '/master/golongan-tarif',
    name: 'golongan-tarif',
    component: () => import('../views/master/golongan_tarif/ListGolonganTarifView')
  },
  {
    path: '/master/golongan-tarif/tambah',
    name: 'tambah-golongan-tarif',
    component: () => import('../views/master/golongan_tarif/FormTambahGolonganTarifView')
  },
  {
    path: '/master/golongan-tarif/edit',
    name: 'edit-golongan-tarif',
    component: () => import('../views/master/golongan_tarif/FormEditGolonganTarifView')
  },
  {
    path: '/master/pelanggan',
    name: 'Pelanggan',
    component: () => import('../views/master/pelanggan/ListPelangganView')
  },
  {
    path: '/master/pelanggan/tambah',
    name: 'TambahPelanggan',
    component: () => import('../views/master/pelanggan/FormTambahPelangganView')
  },
  {
    path: '/master/pelanggan/edit',
    name: 'EditPelanggan',
    component: () => import('../views/master/pelanggan/FormEditPelangganView')
  },
  {
    path: '/master/biaya',
    name: 'Biaya',
    component: () => import('../views/master/biaya/ListBiayaView')
  },
  {
    path: '/master/biaya/tambah',
    name: 'TambahBiaya',
    component: () => import('../views/master/biaya/FormTambahBiayaView')
  },
  {
    path: '/master/biaya/edit',
    name: 'EditBiaya',
    component: () => import('../views/master/biaya/FormEditBiayaView')
  },
  {
    path: '/pemakaian/tarif',
    name: 'ListTarifView',
    component: () => import('../views/pemakaian/tarif/ListTarifView')
  },
  {
    path: '/pemakaian/tarif/tambah',
    name: 'FormTambahTarifView',
    component: () => import('../views/pemakaian/tarif/FormTambahTarifView')
  },
  {
    path: '/pemakaian/tarif/edit',
    name: 'EditTarif',
    component: () => import('../views/pemakaian/tarif/FormEditTarifView')
  },
  {
    path: '/pemakaian',
    name: 'pemakaian',
    component: () => import('../views/pemakaian/pemakaian/ListPemakaianView')
  },
  {
    path: '/pemakaian/detail-pemakaian',
    name: 'detail-pemakaian',
    component: () => import('../views/pemakaian/pemakaian/DetailPemakaianView')
  },
  {
    path: '/pemakaian/cetak-formulir',
    name: 'cetak-formulir',
    component: () => import('../views/pemakaian/pemakaian/CetakFormulir')
  },
  {
    path: '/pembayaran',
    name: 'pembayaran',
    component: () => import('../views/pembayaran/FormTambahPembayaranView')
  },
  {
    path: '/pembayaran/tagihan',
    name: 'tagihan',
    component: () => import('../views/pembayaran/ListTagihan')
  },
  {
    path: '/pembayaran/laporan',
    name: 'laporan',
    component: () => import('../views/pembayaran/LaporanPembayaran')
  },
  {
    path: '/pembayaran/laporan-excel',
    name: 'laporan-excel',
    component: () => import('../views/pembayaran/LaporanPembayaranBulanan')
  },
  {
    path: '/pembayaran/detail-pembayaran',
    name: 'detail-pembayaran',
    component: () => import('../views/pembayaran/DetailPembayaran')
  },
  {
    path: '/master/tahun',
    name: 'tahun',
    component: () => import('../views/master/tahun/ListTahunView')
  },
  {
    path: '/master/tahun/tambah-tahun',
    name: 'tambah-tahun',
    component: () => import('../views/master/tahun/FormTambahTahunView')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
